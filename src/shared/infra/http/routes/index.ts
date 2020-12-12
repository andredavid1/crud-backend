import { Router } from 'express';

import categoriesRouter from '@modules/products/infra/http/routes/categories.routes';
import productsRouter from '@modules/products/infra/http/routes/products.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';

const routes = Router();

routes.use('/categories', categoriesRouter);
routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
