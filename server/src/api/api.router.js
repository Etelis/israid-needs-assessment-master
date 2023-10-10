import { Router } from 'express';
import rnasRouter from './rnas';

const apiRouter = Router();

apiRouter.use('/rnas', rnasRouter);

export default apiRouter;