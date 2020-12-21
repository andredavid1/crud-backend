import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import HashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider';
import CreateUserService from '@modules/users/services/CreateUserService';
import ListUserService from '@modules/users/services/ListUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const hashProvider = new HashProvider();

    const createUser = new CreateUserService(usersRepository, hashProvider);

    const user = await createUser.execute({ name, email, password });

    return response.json(classToClass(user));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const usersRepository = new UsersRepository();

    const listUser = new ListUserService(usersRepository);

    const users = await listUser.execute();

    return response.json(classToClass(users));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const hashProvider = new HashProvider();

    const updateUser = new UpdateUserService(usersRepository, hashProvider);

    const user = await updateUser.execute({ id, name, email, password });

    return response.json(classToClass(user));
  }
}
