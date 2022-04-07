const express = require('express');
const mongoose = require('mongoose');
/*paquetes que vamos a utilizar*/

const user = require("./routes/user");
const auth = require("./routes/auth");
const task = require("./routes/task")

const app =
  express(); /*con esta línea de código, creamos el servidor (que es express)*/
app.use(express.json());
app.use(
  "/api/user",
  user
); /*ruta para que nuestro usuario pueda acceder a la aplicación*/
app.use("/api/auth", auth);
app.use("/api/task", task)

/*con el port le decimos en que puerto se va a ejecutar el servidor*/ /*creamos la variable de entorno*/
const port = process.env.PORT || 3003;
/*vincular y escuchar las conexiones del servidor (para saber si está funcionanado) + que nos muestre un mensaje en consola*/
app.listen(port, () => console.log("Escuchando Puerto: " + port));

/*que nuestro proyecto se conecte a mongodb*/ /*Para que la conexión sea estable*/
mongoose
  .connect("mongodb://localhost/task", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Conectado a Mongo DB"))
  .catch((error) => console.log("No se ha conectado a Mongo DB"));
