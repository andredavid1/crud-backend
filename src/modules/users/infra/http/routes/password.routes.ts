import { Router } from 'express';

import PasswordController from '@modules/users/infra/http/controllers/PasswordController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const usersRouter = Router();
const passwordController = new PasswordController();

usersRouter.use(ensureAuthenticated);

usersRouter.patch('/:id', passwordController.update);

export default usersRouter;
