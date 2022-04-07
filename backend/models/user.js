const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
  },
  password: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

userSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
    },
    "secretKey"
  );
};

//Creamos coleccción user, y el  esquema del documento que se va a guardar en la colección, se lo asignamos a la variable User
const User = mongoose.model("user", userSchema);

module.exports.User = User;
module.exports.userSchema = userSchema

//crear funcion que permite que cuando una persona se registre, se encripten esos datos (seguridad)
