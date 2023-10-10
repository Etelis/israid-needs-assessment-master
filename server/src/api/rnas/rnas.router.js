import { Router } from 'express';
import { createRna, getRNAs } from './rnas.controller';

import rnaAnswersRouter from './answers';

const rnasRouter = Router();

rnasRouter.post('/', createRna);
rnasRouter.get('/', getRNAs);

rnasRouter.use('/:rnaId/answers', rnaAnswersRouter);

export default rnasRouter;