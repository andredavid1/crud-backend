import { compare, hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
  id: string;
  password: string;
  newPassword: string;
}

class UpdatePasswordService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ id, password, newPassword }: IRequest): Promise<User> {
    const checkUser = await this.usersRepository.findById(id);

    if (!checkUser) {
      throw new AppError('User not found.');
    }

    const passwordMatched = await compare(password, checkUser.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect old password.');
    }

    const hashedPassword = await hash(newPassword, 8);

    const user = await this.usersRepository.updatePassword({
      user: checkUser,
      password: hashedPassword,
    });

    return user;
  }
}

export default UpdatePasswordService;
