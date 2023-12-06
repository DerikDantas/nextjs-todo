import mongoose from 'mongoose';

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGO_URL ?? '');
    console.log('Mongo Connection successfully established.');
  } catch {
    throw new Error('Error connecting to Mongoose');
  }
};

export default connect;
