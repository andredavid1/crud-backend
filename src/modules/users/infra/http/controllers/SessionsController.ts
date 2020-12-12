import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import SessionsRepository from '@modules/users/infra/typeorm/repositories/SessionsRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const sessionsRepository = new SessionsRepository();

    const authenticateUser = new AuthenticateUserService(sessionsRepository);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json(classToClass({ user, token }));
  }
}
