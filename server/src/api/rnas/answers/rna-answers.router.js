import { Router } from 'express';
// import { getRnaAnswers, updateRnaAnswers } from './rna-answers.controller';
import { getRnaAnswers } from './rna-answers.controller';

const rnaAnswersRouter = Router({mergeParams: true});

rnaAnswersRouter.get('/', getRnaAnswers);
// rnaAnswersRouter.put('/', updateRnaAnswers);


export default rnaAnswersRouter;