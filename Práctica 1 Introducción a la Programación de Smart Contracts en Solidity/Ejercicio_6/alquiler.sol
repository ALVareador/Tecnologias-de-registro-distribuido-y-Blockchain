// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;

contract alquiler {

  address payable public owner;

  constructor() {
      owner = payable(msg.sender);
  }

  modifier onlyOwnerOf(uint _propiedadId) {
    require(msg.sender == propiedadADuenho[_propiedadId]);
    _;
  }

  struct Propiedad {
    string nombre;
    string direccion;
    string estado;
    uint precioDia;
  }

  struct Alquiler {
    address inquilino;
    uint inicio;
    uint fin;
  }

  Propiedad[] public propiedades;

  mapping (uint => address) public propiedadADuenho;
  mapping (address => uint) public duenhoAPropiedad;
  mapping(uint => Alquiler[]) public propiedadAAlquiler;
  
  function reservar(uint _idPropiedad, uint _inicioAlquiler, uint _finAlquiler) public payable {
    Propiedad storage propiedadAAlquilar = propiedades[_idPropiedad];
    uint numDias = (_finAlquiler - _inicioAlquiler) / 86400;
    uint precio = propiedades[_idPropiedad].precioDia * numDias;
    require(msg.value >= precio, "La cantidad pagada es insuficiente para el alquiler.");
    require(_finAlquiler > _inicioAlquiler);
    require(_rangoAlquileres(_idPropiedad, _inicioAlquiler, _finAlquiler));
    propiedadAAlquiler[_idPropiedad].push(Alquiler(msg.sender, _inicioAlquiler, _finAlquiler));
    propiedades[_idPropiedad] = propiedadAAlquilar;
  }

  function renovar(uint _idPropiedad, uint _inicioAlquiler, uint _finAlquiler) public payable {
    Propiedad storage propiedadARenovar = propiedades[_idPropiedad];
    uint numDias = (_finAlquiler - _inicioAlquiler) / 86400;
    uint precio = propiedades[_idPropiedad].precioDia * numDias;
    require(msg.value >= precio, "La cantidad pagada es insuficiente para el alquiler.");
    require(_finAlquiler > _inicioAlquiler);
    require(_rangoAlquileres(_idPropiedad, _inicioAlquiler, _finAlquiler));
    require(_esInquilino(_idPropiedad, msg.sender));
    propiedadAAlquiler[_idPropiedad].push(Alquiler(msg.sender, _inicioAlquiler, _finAlquiler));
    propiedades[_idPropiedad] = propiedadARenovar;
  }

  function cancelarReserva(uint _idPropiedad, uint _inicioAlquiler, uint _finAlquiler) public {
    require(_esInquilino(_idPropiedad, msg.sender));
    for(uint j = 0; j < propiedadAAlquiler[_idPropiedad].length; j++){
      if (
          propiedadAAlquiler[_idPropiedad][j].inquilino == msg.sender &&
          propiedadAAlquiler[_idPropiedad][j].inicio == _inicioAlquiler &&
          propiedadAAlquiler[_idPropiedad][j].fin == _finAlquiler
        ) {        
            _eliminarAlquiler(j, _idPropiedad);
            uint numDias = (_finAlquiler - _inicioAlquiler) / 86400;
            uint precio = propiedades[_idPropiedad].precioDia * numDias;
            payable(msg.sender).transfer(precio);
      }
    }  
  }

  function anhadirPropiedad(string memory _nombre, string memory _direccion, string memory _estado, uint _precioDia) public {
    Propiedad memory nuevaPropiedad = Propiedad(_nombre, _direccion, _estado, _precioDia);
    propiedades.push(nuevaPropiedad);
    uint id = propiedades.length-1;
    propiedadADuenho[id] = msg.sender;
    duenhoAPropiedad[msg.sender]++;
  }

  function eliminarPropiedad(uint _idPropiedad) public onlyOwnerOf(_idPropiedad) {
    for (uint i = _idPropiedad; i<propiedades.length-1; i++){
      propiedades[i] = propiedades[i+1];
    }
    propiedades.pop();
  }

  function modificarPropiedad(uint _idPropiedad, string memory _nombre, string memory _direccion, string memory _estado) public onlyOwnerOf(_idPropiedad) {
    Propiedad storage propiedadAModificar = propiedades[_idPropiedad];
    propiedadAModificar.nombre = _nombre;
    propiedadAModificar.direccion = _direccion;
    propiedadAModificar.estado = _estado;
  }

  function cancelarReservaInquilino(uint _idPropiedad, uint _inicioAlquiler, uint _finAlquiler, address _inquilino) public onlyOwnerOf(_idPropiedad) {
    require(_esInquilino(_idPropiedad, _inquilino));
    for(uint j = 0; j < propiedadAAlquiler[_idPropiedad].length; j++){
      if (
          propiedadAAlquiler[_idPropiedad][j].inquilino == _inquilino &&
          propiedadAAlquiler[_idPropiedad][j].inicio == _inicioAlquiler &&
          propiedadAAlquiler[_idPropiedad][j].fin == _finAlquiler
        ) {
          _eliminarAlquiler(j, _idPropiedad);
      }
    }
  }

  function cancelarReservasInquilino(uint _idPropiedad, address _inquilino) public onlyOwnerOf(_idPropiedad) {
    require(_esInquilino(_idPropiedad, _inquilino));
    for(uint j = 0; j < propiedadAAlquiler[_idPropiedad].length; j++){
      if(propiedadAAlquiler[_idPropiedad][j].inquilino == _inquilino){
        _eliminarAlquiler(j, _idPropiedad);
      }
    }
  }

  function cancelarReservasPropiedad(uint _idPropiedad) public onlyOwnerOf(_idPropiedad) {
    for(uint j = 0; j < propiedadAAlquiler[_idPropiedad].length; j++){
      _eliminarAlquiler(j, _idPropiedad);
    }
  }

  function _terminoElAlquiler(uint _idPropiedad, address _inquilino) internal view returns (bool) {
      for(uint i = 0; i < propiedadAAlquiler[_idPropiedad].length; i++) {
        if(propiedadAAlquiler[_idPropiedad][i].inquilino == _inquilino) {
          return (propiedadAAlquiler[_idPropiedad][i].fin >= block.timestamp);
        }
      }
    return true;
  }

  function _rangoAlquileres(uint _idPropiedad, uint _inicioAlquiler, uint _finAlquiler) internal view returns (bool) {
        for (uint i = 0; i < propiedadAAlquiler[_idPropiedad].length; i++) {
            if (
                (_inicioAlquiler >= propiedadAAlquiler[_idPropiedad][i].inicio && _inicioAlquiler <= propiedadAAlquiler[_idPropiedad][i].fin) ||
                (_finAlquiler >= propiedadAAlquiler[_idPropiedad][i].inicio && _finAlquiler <= propiedadAAlquiler[_idPropiedad][i].fin)
            ) {
                return false;
            }
        }
        return true;
    }

  function _esInquilino(uint _idPropiedad, address _inquilino) internal view returns (bool) {
    for (uint i = 0; i < propiedadAAlquiler[_idPropiedad].length; i++) {
      if (propiedadAAlquiler[_idPropiedad][i].inquilino == _inquilino) {
        return true;
      }
    }
    return false;
  }

  function _eliminarAlquiler(uint _idPropiedad, uint _id) internal {
        require(_id < propiedadAAlquiler[_idPropiedad].length);
        for (uint i = _id; i < propiedadAAlquiler[_idPropiedad].length - 1; i++) {
            propiedadAAlquiler[_idPropiedad][i] = propiedadAAlquiler[_idPropiedad][i + 1];
        }
        propiedadAAlquiler[_idPropiedad].pop();
    }
  
  function transferirFondosAlDuenho() public {
        require(msg.sender == owner, "Solo el duenho puede transferir fondos");
        uint256 balance = address(this).balance;
        owner.transfer(balance);
    }
}
