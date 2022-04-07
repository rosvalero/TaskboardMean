const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: String,
  name: String,
  description: String,
  status: String,
  imageURL: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("task", taskSchema);

//Se coloca el nombre personalizado del módulo que exportamos -> que sería user
module.exports = Task;
