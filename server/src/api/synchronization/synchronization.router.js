import { Router } from 'express';
import { synchronize } from './synchronization.controller';

const synchronizationRouter = Router();

synchronizationRouter.post('/', synchronize);

export default synchronizationRouter;