# Práctica 1: Introducción a la Programación de Smart Contracts en Solidity
## Ejercicio 1 [0.05 puntos]:
Con el objetivo de poner en práctica los conceptos básicos de Solidity mencionados se propone la creación de un contrato inteligente con las siguientes indicaciones:


- Creación de un nuevo archivo en el que escribir el código de Solidity. Esto se puede hacer a través del explorador de archivos en el lado izquierdo de Remix - Ethereum IDE.


- Objetivo: Se creará una fábrica donde se fabrican o ensamblan diferentes productos inteligentes (p. ej., tuberías, accesorios, bloques).

Una vez que terminemos la implementación y la prueba del código del contrato inteligente, se subirá el código a una carpeta de GitHub/Gitlab.

## Ejercicio 2 [0.05 puntos]:
Crearemos un nuevo contrato inteligente en Remix IDE: nombre .TokenContract.sol. Se procederá a pegar el siguiente código fuente.

```
// SPDX-License-Identifier: Unlicenced
pragma solidity 0.8.18;
contract TokenContract {
  address public owner;
  struct Receivers {
    string name;
    uint256 tokens;
  }
  mapping(address => Receivers) public users;
  modifier onlyOwner(){
    require(msg.sender == owner);
    _;
  }
  constructor(){
    owner = msg.sender;
    users[owner].tokens = 100;
  }
  function double(uint _value) public pure returns (uint){
    return _value*2;
  }
  function register(string memory _name) public{
    users[msg.sender].name = _name;
  }
  function giveToken(address _receiver, uint256 _amount) onlyOwner public{
    require(users[owner].tokens >= _amount);
    users[owner].tokens -= _amount;
    users[_receiver].tokens += _amount;
  }
}
```
Si la compilación funciona sin errores, podemos ver en la ventana de la consola que el contrato ha sido desplegado y podemos interactuar con él. 

Finalizaremos la implementación del contrato para que cualquier token pueda ser comprado con Ether, siempre que el propietario todavía tenga suficientes tokens. 1 token debería costar 5 Ether después de la nueva implementación.

Si la cantidad de Ether enviada no es suficiente o el propietario no tiene suficientes tokens, se debe enviar un mensaje de error. Mostraremos la cantidad de Ether que hay en el contrato inteligente. Probaremos de nuevo el contrato y cuando se finalice su implementación se subirá a una carpeta de GitHub/Gitlab.

## Ejercicio 3 [0.1 puntos]:
MetaMask actúa como una cartera que permite a las aplicaciones web comunicarse de manera fácil con la blockchain de Ethereum. Instalaremos la extensión del navegador MetaMask en vuestro navegador preferido: https://metamask.io. También está disponible para iOS y Android. 

Activemos "Mostrar redes de prueba" (testnets) en Select a network.

Para conectar MetaMask a una testnet como Sepolia, haremos clic en "Ethereum Mainnet" en la esquina superior izquierda de MetaMask y seleccionaremos "Sepolia" en el menú desplegable.

Para ver las funcionalidades de MetaMask podemos hacer clic en los tres puntos en la esquina superior derecha.

Para obtener ether podemos usar un faucet, una página web o aplicación sencilla mediante la cual puedes conseguir criptomoneda gratis o con poco esfuerzo (e.g., a cambio de realizar tareas muy pequeñas como resolver tests Captcha o ver anuncios). Nacieron para promover el conocimiento y la adopción de las criptomonedas.

Podemos usar los siguientes ejemplos (requieren signup/login):
- https://sepoliafaucet.com (requiere crear cuenta en Alchemy).
- https://www.infura.io/faucet/sepolia (requiere que un usuario conecte una dirección de billetera que contenga 0.001 ETH de la mainnet).

También podríamos obtener ETH de Goerli, aunque esta testnet va a estar obsoleta en breve: https://goerlifaucet.com/

El objetivo de este ejercicio es:
- Familiarizarse con las distintas funcionalidades de MetaMask.
- Obtener ETH de prueba de Sepolia.
- Enviar algo de Sepolia ETH a tus compañeros de clase.
- Realizar un seguimiento de las transacciones en Sepolia Blockchain Explorer: https://sepolia.etherscan.io/

Las capturas de las transacciones se incluirán en la carpeta de GitHub/Gitlab.

## Ejercicio 4 [0.25 puntos]:
Ethereum recomienda múltiples herramientas para experimentar un aprendizaje interactivo. Entre las opciones propuestas destaca CryptoZombies. CryptoZombies es una escuela de programación interactiva creada por el equipo de Loom Network que enseña a crear contratos inteligentes en Solidity mientras construyes tu propio juego cripto-coleccionable. Mediante lecciones de programación interactivas se profundizará en algunos conceptos de Solidity. Con el ejercicio 1 ya has avanzado en la creación de la fábrica de Zombies! 

Completa Solidity: Beginner to Intermediate Smart Contracts y una vez termines sube el código resultante a tu carpeta de GitHub/Gitlab.

## Ejercicio 5 [0.05 puntos]:
OpenZeppelin proporciona un conjunto completo de herramientas para desarrollar proyectos de Ethereum. En concreto, puede ser muy útil la biblioteca OpenZeppelin Solidity, donde se pueden ver múltiples ejemplos de código de contratos inteligentes. Escoged y probad uno de los contratos. Guárdalo en un nuevo archivo *.sol y súbelo a tu carpeta de Github/Gitlab.

Recordad que siempre se puede consultar la documentación de Solidity para obtener explicaciones adicionales y múltiples ejemplos de código fuente.

## Ejercicio 6 (2-3 personas) [0.5 puntos]:
El objetivo de este ejercicio es crear tu propio contrato inteligente. Se recomiendan los siguientes pasos:
1. Análisis y definición del escenario, debe requerir la funcionalidad proporcionada por una blockchain pública como Ethereum.
2. Diseño
   - Definir un caso de uso (lógica de negocio, automatización de transacciones de determinados aspectos).
   - Definir el contenido del contrato inteligente, específicamente sus datos, funciones que operan sobre los datos, reglas de operación, entre otros.
   - Definir los usuarios del sistema (e.g., diagrama de casos de uso).
3. Implementación
   - Programar el código del contrato inteligente utilizando el conocimiento adquirido en los ejercicios previos.
4. Pruebas
   - Realizar pruebas del contrato inteligente en Remix IDE.
   - (Opcional) Las pruebas de software incluyen pruebas unitarias, pruebas de integración o pruebas a nivel de sistema. Además, un entorno de desarrollo de blockchain profesional incluirá el uso de herramientas adicionales: Web3.js en Javascript, Truffle, clientes de Ethereum como geth.

##
Documentación: Prepara un documento que explique cómo se han realizado los pasos anteriores.

Una vez se finalice el código del contrato inteligente, debe subirse a la carpeta de GitHub/Gitlab junto con el archivo de documentación.
