import AppError from '@shared/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  id: string;
  name: string;
  email: string;
  password: string;
}

class UpdateUserService {
  constructor(
    private usersRepository: IUsersRepository,
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ id, name, email, password }: IRequest): Promise<User> {
    const checkUserExist = await this.usersRepository.findById(id);

    if (!checkUserExist) {
      throw new AppError('User not found');
    }

    const checkDuplicatedEmail = await this.usersRepository.findByEmail(email);

    if (checkDuplicatedEmail) {
      if (checkDuplicatedEmail.id !== email) {
        throw new AppError('E-mail already registered');
      }
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.update({
      id,
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default UpdateUserService;
