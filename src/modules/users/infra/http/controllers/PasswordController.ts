import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import UpdatePasswordService from '@modules/users/services/UpdatePasswordService';

export default class PasswordController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { password, newPassword } = request.body;

    const usersRepository = new UsersRepository();

    const updatePassword = new UpdatePasswordService(usersRepository);

    const user = await updatePassword.execute({ id, password, newPassword });

    return response.json(classToClass(user));
  }
}
