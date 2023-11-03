import { Router } from 'express';
import { getCategories } from './categories.controller';

const categoriesRouter = Router();

categoriesRouter.get('/', getCategories);

export default categoriesRouter;