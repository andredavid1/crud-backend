import { Router } from 'express';

import ProductsController from '@modules/products/infra/http/controllers/ProductsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.use(ensureAuthenticated);

productsRouter.post('/', productsController.create);
productsRouter.get('/', productsController.index);
productsRouter.put('/:id', productsController.update);

export default productsRouter;
