import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  id: string;
  password: string;
  newPassword: string;
}

class UpdatePasswordService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ id, password, newPassword }: IRequest): Promise<User> {
    const checkUser = await this.usersRepository.findById(id);

    if (!checkUser) {
      throw new AppError('User not found.');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      checkUser.password,
    );

    if (!passwordMatched) {
      throw new AppError('Incorrect old password.');
    }

    const hashedPassword = await this.hashProvider.generateHash(newPassword);

    const user = await this.usersRepository.updatePassword({
      user: checkUser,
      password: hashedPassword,
    });

    return user;
  }
}

export default UpdatePasswordService;
