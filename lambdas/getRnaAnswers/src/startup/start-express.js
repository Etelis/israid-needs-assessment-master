import express from 'express';
import apiRouter from '../api';
import cors from 'cors';

export const startExpress = () => {
  const app = express();

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json());
  app.use(cors());

  app.use('/api', apiRouter);

  return new Promise((resolve) => {
    const port = process.env.PORT || 3000;

    app.listen(port, () => {
      resolve({ app, port });
    });
  })
}