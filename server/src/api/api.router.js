import { Router } from 'express';
import rnasRouter from './rnas';
import synchronizationRouter from './synchronization';
import categoriesRouter from './categories/categories.router';
const apiRouter = Router();

apiRouter.use('/rnas', rnasRouter);
apiRouter.use('/synchronize', synchronizationRouter);
apiRouter.use('/categories', categoriesRouter);

export default apiRouter;
