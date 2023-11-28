import mongoose, { Schema, model } from 'mongoose';

export const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50
  },
  password: {
    type: String,
    required: true,
    min: 8
  }
});

export default mongoose.models.User || model('User', userSchema);
