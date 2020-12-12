import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

class UpdateUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ id, name, email }: IRequest): Promise<User> {
    const checkUserExist = await this.usersRepository.findDuplicatedForUpdate(
      id,
      email,
    );

    if (checkUserExist) {
      throw new AppError('E-mail already registered');
    }

    const user = await this.usersRepository.update({
      id,
      name,
      email,
    });

    return user;
  }
}

export default UpdateUserService;
