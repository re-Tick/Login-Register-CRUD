const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  goal: {
    type: String,
    default: ""
  },
  email:{
    type: String,
    required: true
  }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
