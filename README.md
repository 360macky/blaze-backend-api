<h1 align="center"> Blaze Backend API </h1>

<p align="center">Challenge #1 of Blaze Engineering test</p>

<img
  src="./.github/api_demo.gif"
  title="Screenshot of Blaze Backend API"
  alt="Screenshot of Blaze Backend API"
  align="center"
/>

## 🚀 Deployment
Este es uno de los desafíos propuestos por Blaze. Donde programé una API desarrollada en NodeJS, usando una conexión con MongoDB.

Para el despliegue de la demo usé **Heroku** y **MongoDB Atlas**.

## 💻 Ingeniería
Para el desarrollo de este Backend creé una clase `Customers`, que interactúa con la base de datos y realiza acciones en ella:

Usamos la librería mongoose para ello:
```javascript
const mongoose = require('mongoose');
```

Configuramos las variables de entorno para utilizar la URI de MongoDB
```javascript
require('dotenv').config();
```

Definimos un esquema mongoose:
```javascript
const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
});
```
Y lo compilamos en un modelo

```javascript
const customerModel = mongoose.model('customer', customerSchema, 'customers');
```

La clase `Customers` se define luego. Incorpora una constructor para conectar a la base de datos a través de la variable de entorno (`MONGODB_URI`), y después se declaran todos los métodos pedidos por el reto:

* Obtener todos los customers
* Añadir un nuevo customer
* Actualizar un nuevo customer

```javascript
class Customers {
  constructor() {
    mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  }
  // Methods...
}
```

