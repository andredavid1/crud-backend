import { Router } from 'express';

import CategoriesController from '@modules/products/infra/http/controllers/CategoriesController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const categoriesRouter = Router();
const categoriesController = new CategoriesController();

categoriesRouter.use(ensureAuthenticated);

categoriesRouter.post('/', categoriesController.create);
categoriesRouter.get('/', categoriesController.index);
categoriesRouter.put('/:id', categoriesController.update);

export default categoriesRouter;
