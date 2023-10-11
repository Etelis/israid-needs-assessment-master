import { connectMongoose } from './startup/connect-mongoose';
import { startExpress } from './startup/start-express';
import dotenv from 'dotenv';

dotenv.config();

connectMongoose()
  .then(startExpress)
  .then(({ port }) => {
    console.log(`App started on port ${port}`);
  });