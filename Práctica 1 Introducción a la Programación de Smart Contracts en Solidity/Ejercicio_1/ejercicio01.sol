//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.10;

contract FabricaContract{

	uint private idDigits = 16;

	struct Producto {
    		string nombre;
    		uint identificacion;
	}

	Producto[] public productos;

	function crearProducto(string memory _nombre, uint _id) private{
    		Producto memory nuevoProducto = Producto(_nombre, _id);
    		productos.push(nuevoProducto);
    		emit NuevoProducto(productos.length-1, _nombre, _id);
	}

	function generarIdAleatorio(string memory _str) private view  returns(uint){
    		uint rand = uint(keccak256(abi.encodePacked(_str)));
    		uint idModulus = 10^idDigits;
    		return rand % idModulus;
	}

	function crearProductoAleatorio(string memory _nombre) public{
    		uint randId = generarIdAleatorio(_nombre);
    		crearProducto(_nombre, randId);
	}

	event NuevoProducto(uint ArrayProductId, string nombre, uint id);

	mapping (uint => address) public productoAPropietario;

	mapping  (address => uint) propietarioProductos;

	function Propiedad(Producto memory _producto) private {
    		address direccion = msg.sender;
    		productoAPropietario[_producto.identificacion] =  direccion;
    		propietarioProductos[direccion]++;
	}

	function deProductosPorPropietario(address _propietario) external view  returns(uint[] memory){
    		uint contador = 0;
    		uint contador2 = 0;
    		uint[] memory resultado= new uint[](productos.length);
    		for (contador; contador < productos.length; contador++)
    		{
        			if(productoAPropietario[productos[contador].identificacion] == _propietario){
            				resultado[contador2] = (productos[contador].identificacion);
            				contador2++;
        			}
    		}
    		return resultado;
	}
}

