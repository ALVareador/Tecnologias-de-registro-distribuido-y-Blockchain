# Alquiler de Propiedad a Corto Plazo
## Análisis y definición del escenario
 Un contrato que permite a los inquilinos reservar y acceder a una propiedad de alquiler por un período determinado después de realizar un pago en criptomonedas.
## Diseño
### Caso de uso
| Indentificador | Alquiler de una propiedad |
| --- | --- |
| Descripción | El sistema deberá permitir al inquilino solicitar el alquiler de una propiedad |
| Secuencia Normal | 1.- El usuario realiza una petición al contrato |
| --- | 2.- El sistema comprueba si la cantidad de criptomoneda es suficiente para la realización del contrato |
| --- | 2a.- Si el usuario posee suficiente crédito, se le asigna la propiedad durante el tiempo especificado y se cobra el precio de su alquiler al usuario |
| --- | 2.b- Si el usuario no posee suficiente crédito, se deniega la transacción |
| Rendimiento | --- |
| Frecuencia | --- |
| Importancia | De alta importancia para el funcionamiento de la aplicación |
| Urgencia | --- |
| Comentarios | --- |
 
### Contenido del contrato inteligente
#### Datos
Nombre | Descripción |
| --- | --- |
| Propiedad | Estructura de la propiedad a alquilar. Contiene: |
|	nombre | Nombre de la propiedad. |
|	dirección | Dirección física de la propiedad. |
|	estado | Estado físico de la propiedad. |
|	precioDia | Precio de la propiedad por día. |
| Alquiler | Estructura para almacenar información sobre cada alquiler. |
|	inquilino	| Dirección del inquilino. |
|	inicio | Fecha de inicio del alquiler. |
|	fin | Fecha de finalización del alquiler. |
| propiedadADuenho | Mapping que relaciona una propiedad con su dueño. |
| duenhoAPropiedad | Mapping que relaciona a un usuario con el número de propiedades que posee. |
| propiedadAAlquiler | Mapping que relaciona una propiedad con un array de alquileres. |

#### Funciones
| Nombre | Descricpción |
| --- | --- |
| reservar |	Permite a un inquilino alquilar una propiedad. |
| renovar |	Permite a un inquilino volver a alquilar una propiedad que ya ha alquilado anteriormente. |
| cancelarReserva |	Permite a un inquilino cancelar un alquiler. |
| anhadirPropiedad |	Permite a un propietario añadir una propiedad. |
| eliminarPropiedad |	Permite a un propietario eliminar una de sus propiedades. |
| modificarPropiedad |	Permite a un propietario modificar una de sus propiedades. |
| cancelarReservaInquilino |	Permite a un propietario cancelar el alquiler de un inquilino. |
| cancelarReservasInquilino |	Permite a un propietario cancelar todos los alquileres de un inquilino. |
| cancelarReservasPropiedad |	Permite a un propietario cancelar todos los alquileres de una propiedad. |
| _terminoElAlquiler |	Comprueba si el alquiler de un inquilino ya ha terminado. |
| _rangoAlquileres |	Comprueba si una propiedad está alquilada durante un periodo de tiempo. |
| _esInquilino |	Comprueba si un inquilino ha alquilado una propiedad. |
| _eliminarAlquiler |	Función interna para eliminar alquileres. |
| transferirFondosAlDuenho |	Función para acceder a los fondos del contrato. |

### Usuarios del sistema
 Dueños de propiedades: Usuarios que ofrezcan propiedades a alquilar.
 
 Inquilinos: Usuarios que deseen alquilar propiedades.

![Diagrama de casos de uso](https://github.com/ALVareador/Tecnologias-de-registro-distribuido-y-Blockchain/blob/main/assets/images/practica01_ejercicio06_diagramaDeCasosDeUso.png)
