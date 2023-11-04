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
 propiedades disponibles
 
 propiedades alquiladas
#### Funciones
 reservar propiedad

 cancelar reserva inquilino

 renovar reserva

 añadir propiedad

 eliminar propiedad

 modificar propiedad

 cancelar reserva propietario
### Usuarios del sistema
 Dueños de propiedades: Usuarios que ofrezcan propiedades a alquilar.
 
 Inquilinos: Usuarios que deseen alquilar propiedades.

<dl>
<img src="https://embed.creately.com/NGB2MgXMXTO?token=5Fqk7LDv90v0NtUS&type=svg">
</dl>
