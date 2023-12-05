import mongoose, { Schema } from 'mongoose';

const todoSchema = new Schema(
  {
    title: String,
    description: String,
    completed: Boolean,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);

export default Todo;
