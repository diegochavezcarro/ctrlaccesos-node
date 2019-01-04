# ctrlaccesos-node
Instrucciones para Windows: 
1. Instalar las dependencias: 
npm install
2. Si se quiere cambiar de entorno, por ej produccion:
$env:NODE_ENV="production"
Si no dejar lo que esta por defecto. 
3. Si se quiere setear el secret por variable de entorno, de forma mas segura:
$env:SECRET_CTRL_ACCESS="Secreto de Prueba"
4. Levantar:
npm start
Si el entorno es el default se levantara en puerto 4000, si es produccion sera 80
5. Probar en Postman:
Hacer un GET a localhost:4000/users
Va a dar que falta el token.
6. Autenticarse:
POST a http://localhost:4000/users/authenticate
Con body en "raw", formato "json":
{"username": "test", "password":"test"}
7. Copiar el token devuelto. Acceder por GET a localhost:4000/users
Utilizar el tab Authorization, eligiendo "Bearer Token" y pegar el token anterior.
Deberia devolver los usuarios guardados en el mock.
