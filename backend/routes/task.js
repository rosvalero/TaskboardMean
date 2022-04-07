const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const { User } = require("../models/user");
const auth = require("../middleware/auth");

router.get("/list", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send("Usuario no está en Base de datos");
  const tasks = await Task.find({ userId: req.user._id });

  res.send(tasks);
});

router.post("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send("el usuario no existe");

  const task = new Task({
    userId: user._id, //relacion
    name: req.body.name,
    status: "to-do",
    description: req.body.description,
  });

  const result = await task.save();
  res.status(201).send(result);
});

router.put("/", auth, async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) return res.status(400).send("No hay usuario");

  const task = await Task.findByIdAndUpdate(
    req.body._id,
    {
      userId: user._id,
      name: req.body.name,
      status: req.body.status,
      description: req.body.description,
    },
    {
      new: true, //parametro o  argumento adicional que se le debe agregar al find ByIdAndUpdate
    }
  );
  if(!task){
      return res.status(404).send('No exite la tarea')
  }
  res.status(200).send(task)
});


router.delete('/:_id', auth, async (req,res)/*Colocamos los parametros con la función para que se ejecuten al mismo tiempo con ella*/=>{
    const user /*Guarda el json del usuario que encontró*/ = await User.findById(req.user._id)
    if(!user) /*Si no encontró ningún usuario se cumpliría la condicional optimizada*/ return res.status(400).send('El usuario no existe')
    const task = await Task.findByIdAndDelete(req.params._id)
    if(!task){
        return res.status(400).send('No hay tarea, no se pudo borrar')
    }
    res.status(200).send({message: 'borrado'})
})


module.exports = router;
