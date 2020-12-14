import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class ProfileController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository();

    const updateUser = new UpdateUserService(usersRepository);

    const user = await updateUser.execute({ id, name, email, password });

    return response.json(classToClass(user));
  }
}
