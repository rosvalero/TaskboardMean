//Creamos la variable express para decirle que requerimos el paquete express
const express = require("express");
//La variabla va a guardar el express pero sólo algo en específico que necesitamos
//Puede gestionar la parte de request y report
const router = express.Router();
const { User } = require("../models/user");

//Primera ruta: petición de registrar usuario
//Método async: asincronismo
//Todas las funciones, peticiones que tengan async se van a ejecutar en tiempo real
router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("Ese usuario ya existe");
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  const result = await user.save();
  const jwtToken = user.generateJWT();
  res.status(200).send({ jwtToken });
});

module.exports = router;

