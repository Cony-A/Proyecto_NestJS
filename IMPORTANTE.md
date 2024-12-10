Creadora: Constanza Arriaza
Algunas cosas importantes para considerar:

TOKEN JWT:
Al momento de utilizar JwtService para creaer y firmar el token JWT para la autenticación, este dio algunos problemas.
La solución fue utilizar jsonwebtoken como alternativa a JwtService. 
JwtService aún se conserva en partes del código. Esto se decidió dejarlo así para no afectar al código.
También se dicidió conservarlo como parte de la documentación y para ver su uso a futuro o para encontrar una solución.
El token funciona perfectamente. Las veces que lo probe, devolvía el token firmado al momento de autenticarme como usuario.

ENDPOINTS:
Estos son los endpoints:
Incian con: http://localhost:3000
Usuarios:

POST /auth/login
POST /users/register
GET /users/profile
GET /products
GET /products/:id
GET /categories
GET /categories/:id
POST /orders
Administradores:

GET /users/admin
POST /products
PUT /products/:id
DELETE /products/:id
POST /categories
PUT /categories/:id
DELETE /categories/:id
GET /orders
GET /orders/:id
PUT /orders/:id
DELETE /orders/:id

Se hizo varias pruebas en POSTMAN antes de dar por finalizado el proyecto, y en general, todas funcionaron muy bien.
Devuelve los tokens.
Permite autenticarse.
Permite creaer productos y categorias.
Permite crear, actualizar, eliminar ordenes, etc.
Se respetan los roles.
Todo parece funcionar.
