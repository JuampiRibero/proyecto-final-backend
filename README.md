# Proyecto Final Backend

App deployada en:

```
https://proyecto-final-backend-jpr.herokuapp.com/
```

## Resumen del Desarrollo

La aplicación fué desarrolla en **NodeJS** usando el framework **Express** y base de datos **MongoDB** en su versión online **MongoAtlas**. Para autenticación y autorización se utilizó **passport-local** junto **bcrypt** para encriptar las contraseñas. Las notificaciones enviadas por correo electrónico se manejan con **Nodemailer** y las enviadas por SMS y Whatsapp con **Twilio**. Como motor de plantillas se utilizó **Handlebars**. El chat está implementado con **Websocket**.

## Uso de la App

1. Creá una carpeta para el proyecto.

2. Luego ejecutá una terminal y parate en la carpeta creada.

3. Cloná el repositorio con el siguiente comando:

```
git clone https://github.com/JuampiRibero/proyecto-final-backend.git
```

4. Instalá todas las dependencias necesarias:

```
npm i
```

5. Creá los siguientes archivos de variables de entorno:

- development.env
- production.env

En **.env.example** vas a encontrar todo lo necesario para iniciar la App.

## Inicio rápido del Servidor

Con el archivo **production.env** completo de acuedo al **.env.example**, corré el siguiente comando:

```
npm start
```

## Iniciar el Servidor

- Modo producción, es necesario el archivo production.env:

```
npm run prod -- --portCLI=número de puerto
```

- Modo desarrollo, es necesario el archivo development.env:

```
npm run dev -- --portCLI=número de puerto
```

Siempre tenés que especificar el --portCLI, por defecto se le asigna el de process.env.PORT que se encuentra vacio ya que el proyecto es deployado en Heroku.

### CLI opcionales

Se utiliza **Yargs** para cofigurar ciertos parámetros por consola:

- --portCLI=Numero de puerto

- --mongouriCLI=URL de MongoAtlas

- --notifyMailCLI=correo electrónico donde se van a enviar las notificaciones

- --passMailCLI=contraseña del correo electrónico

- --expirationSessionCLI=duración de la sesión en milisegundos

- --persistenceCLI=mongodb o memory

Es necesario luego de ingresar **npm run prod --** los doble flats finales (--) y luego, mediante doble flat y alguno de los parámetros de arriba colocar el valor

Ejemplo de CLI :

```
npm run prod -- --portCLI=3000 --expirationSessionCLI=500000
```

## Rutas

### routesAuth

.post("/api/signup") → se envia mediante req.body la información necesaria para poder registrar un usuario:

```
name: req.body.name,
lastname: req.body.lastname,
age: req.body.age,
number: req.body.number,
address: req.body.address,
email: req.body.email,
avatar: `/static/avatar/${req.file.filename}`,
password: createHash(req.body.password),
```

.get("/error-signup") → si hay error en el registro se redireccionada a .get("/signup-error") renderizando vista indicado que hubo un error. Si el usuario es creado correctamente se redirige a .get("/login") que renderiza la vista de login.

.post("/api/login") → se envia mediante req.body la información necesaria para poder iniciar sesión.

```
req.body.email
req.body.password
```

.get("/error-login") → si hay error en el login se redirecciona a .get("/login-error") renderizando vista indicando que hubo un error. Si el usuario se logea correctamente se redirige a .get("/productos/vista") que renderiza una vista con una tabla con todos los productos.

.post("/api/logout") → se deslogea el usuario, se destruye la sesion creada y se redirecciona a .get("/goodbye") que renderiza la vista de que ha terminado su sesión.

### routesCart

.post("/api/cart") → recibe por req.body un array de objetos que contiene:

```
{
    id: id del producto,
    quantity: número con la cantidad agregada
}
```

Si la sesion no tiene la propiedad cartSession la crea y agrega los productos encontrados. Si existe una cartSession busca si existen mismo productos en el cart para cambiarle la cantidad, y si no existen los agrega. Luego redirige a:

.get("/api/cart") → captura el cartSession de nuestra sesion y renderiza la vista del carrito.

### routesOrder

.post("/api/order") → recibe por req.body un array de objetos que contiene:

```
{
    id: id del producto,
    quantity: número con la cantidad agregada
}
```

Busca los ID de todos los productos y los pushea al **finalCart** con el que se crea la orden:

```
{
    productsOnCart: [array de los productos ingresados],
    orderNumber: número de orden,
    timestamp: fecha de creación de la orden,
    state: estado de la orden,
    email: mail de la persona que solicitó la orden
}
```

Luego destruirá la propiedad cartSession y renderizará la página inicial.

.get("/api/order") → muestra todas las ordenes creadas.

.get("/api/order/id/:id") → recibe por parametro (req.params.id) el id de la orden y lo devuelve.

.delete("/api/order/id/:id") → recibe por parametro (req.params.id) el id de la orden y lo devuelve.

### routesProducts

.post("/api/product") → crea productos para que queden grabados. Recibe en su req.body:

```
{
    title: nombre del producto,
    price: precio del producto,
    thumbnail: url de la imagne del producto,
    timestamp: fecha de carga del producto,
    description: descripción del producto,
    code: código del producto,
    category: categoría del producto,
    stock: stock del producto,
}

```

Luego redirecciona a .get('/productos/agregar) que renderiza nuevamente la vista para agregar más productos a la tienda.

.get("/api/product/:id") → Busca productos por su id. Recibe el mismo por parámetro (req.params.id), ejemplo:

```
/api/product/633080ed323d4678c551c4e6
```

Luego renderiza página de detalle de producto.

.get("/api/product/") → Busca todos los productos. Luego renderiza página con todos los de producto.

.patch("/api/product/:id") → Actualiza producto por id que ingresa mediante parámetro (req.params.id), y recibe por su body el campo que desea actualizar, ejemplo:

Producto a actualizar:

```
/api/product/633080ed323d4678c551c4e6
```

Información que podrá actualizar:

```
{
    title: nombre del producto,
    price: precio del producto,
    thumbnail: url de la imagne del producto,
    timestamp: fecha de carga del producto,
    description: descripción del producto,
    code: código SKUD del producto,
    category: categoría del producto,
    stock: stock del producto,
}

```

Devuelve un JSON con la información del producto actualizado.

.delete("/api/product/:id") → Borra producto de la tienda. Ingresa su id mediante req.params.id, ejemplo:

```
/api/product/633080ed323d4678c551c4e6
```

Devuelve un JSON con la información de que el producto ha sido eliminado.

.get("/api/product/category/:category") → Busca productos por su categoria. Recibe el mismo por parámetro (req.params.category), ejemplo:

```
/api/product/category/consolas
```

Luego renderiza página con todos los productos que cumplan con dicha categoria.

### routesUser

.post("/api/user") → recibe por req.body la información del usuario a crear:

```
name: req.body.name,
lastname: req.body.lastname,
age: req.body.age,
number: req.body.number,
address: req.body.address,
email: req.body.email,
avatar: req.file.filename,
password: req.body.password,
```

.get("/api/user") → devuelve el listado de todos los usuarios.

.get("/api/user/:id") → devuelve usuario correspondiente al parametro id (req.params.id).

.get("/api/user/email/:email") → devuelve usuario correspondiente al parametro email (req.params.email).

.delete("/api/user/:id") → elimina usuario correspondiente al parametro id (req.params.id).

.patch("/api/user/:id") → modifica usuario correspondiente al parametro id (req.params.id) según la información que venga en el body (req.body):

```
name: req.body.name,
lastname: req.body.lastname,
age: req.body.age,
number: req.body.number,
address: req.body.address,
email: req.body.email,
avatar: req.file.filename},
password: req.body.password,
```

### routesMessagesChat

Si bien las rutas existen, el servicio de chat está implementado con **Websocket**.
.get("/api/message/list-messages") → renderiza una vista del chat.
.post("/api/message/new-message") → recibe del req.body:

```
{
    author: {
            firstName: nombre del usuario,
            lastName: apellido del usuario,
            age: edad del usuario,
            alias: alias del usuario,
            avatar: link url de imagen,
            date: fecha de creación del mensaje
            }
    text: texto del chat
}
```

Devuelve un JSON informando que el mensaje de chat se creo satisfactoriamente.

### routesView

.get("/") → si el usuario no está autenticado renderizará la vista de logín, pero si está autenticado renderizará la página con el listado de todos los productos.

.get("/productos/vista") → renderiza página con todos los productos

.get("/productos/agregar") → renderiza página para agregar productos.

.get("/productos/:category") → renderiza página con la categoría de productos que le ha llegado por parametro.

.get("/productos/detalle/:id") → renderiza la página de detalle de producto (id) que le ha llegado por parametro.

.get("/carrito/vista") → renderiza la página del checkout del carrito.

.get("/purchase-completed") → renderiza la página de compra finalizada.

.get("/chat-view") → renderiza la página de chat general.

.get("/chat/:email") → rendeiza la página con los chat de una persona en particular indicada mediante parametro (req.params.email).

.get("/login") → renderiza pantalla de login.

.get("/signup") → renderiza pantalla de registro.

.get("/welcome") → renderiza pantalla de bienvenida.

.get("/goodbye") → renderiza pantalla de despedida o deslogueo.

.get("/login-error") → renderiza pantalla de error de inicio de sesion.

.get("/signup-error") → renderiza pantalla de error de registro.

.get("/server-config") → renderiza pantalla de configuración de la APP si es ADMIN=TRUE.

### routesProcessInfo

.get("/info") → renderiza la información del servidor de la app.
