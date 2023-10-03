const mongoose = required("mongoose");
const taskSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const Task = mongoose.model("Tasks", taskSchema);
module.export = Task;
