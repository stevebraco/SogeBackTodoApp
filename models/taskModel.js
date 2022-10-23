import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true},
    description: { type: String },
    completed: {type: Boolean},
    date: { type: Date, default: new Date() },
  },
  {
    timestamp: true,
  }
);

const Task = mongoose.model("Task", taskSchema);

export default Task;
