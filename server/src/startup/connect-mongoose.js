import mongoose from 'mongoose';

export const connectMongoose = async () => {
  return await mongoose.connect(process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/israid');
}