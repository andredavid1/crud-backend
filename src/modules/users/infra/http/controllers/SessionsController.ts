import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();
    const hashProvider = new HashProvider();

    const authenticateUser = new AuthenticateUserService(
      usersRepository,
      hashProvider,
    );

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json(classToClass({ user, token }));
  }
}
