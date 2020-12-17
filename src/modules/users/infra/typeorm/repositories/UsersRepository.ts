import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUpdatePasswordDTO from '@modules/users/dtos/IUpdatePasswordDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(): Promise<User[] | undefined> {
    const users = await this.ormRepository.find({
      order: {
        created_at: 'ASC',
      },
    });

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async update(userData: IUpdateUserDTO): Promise<User> {
    return this.ormRepository.save(userData);
  }

  public async updatePassword({
    user,
    password,
  }: IUpdatePasswordDTO): Promise<User> {
    const updateUser = user;

    updateUser.password = password;

    await this.ormRepository.save(updateUser);

    return updateUser;
  }
}

export default UsersRepository;
