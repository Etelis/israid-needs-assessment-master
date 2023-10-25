import { Router } from 'express';
import rnasRouter from './rnas';
import synchronizationRouter from './synchronization';
const apiRouter = Router();

apiRouter.use('/rnas', rnasRouter);
apiRouter.use('/synchronize', synchronizationRouter);

export default apiRouter;