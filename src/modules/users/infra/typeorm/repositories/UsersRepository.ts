import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import { getRepository, Not, Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findAll(): Promise<User[] | undefined> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findDuplicatedForUpdate(
    id: string,
    email: string,
  ): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        id: Not(id),
        email,
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
}

export default UsersRepository;
