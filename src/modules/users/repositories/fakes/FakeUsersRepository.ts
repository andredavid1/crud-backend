import { uuid } from 'uuidv4';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findAll(): Promise<User[] | undefined> {
    return this.users;
  }

  public async findDuplicatedForCreate(
    email: string,
  ): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async findDuplicatedForUpdate(
    id: string,
    email: string,
  ): Promise<User | undefined> {
    const findUser = this.users.find(
      user => user.email === email && user.id !== id,
    );

    return findUser;
  }

  public async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid(), name, email, password });

    this.users.push(user);

    return user;
  }

  public async update({
    id,
    name,
    email,
    password,
  }: IUpdateUserDTO): Promise<User> {
    const index = this.users.findIndex(user => user.id === id);

    this.users[index].name = name;
    this.users[index].email = email;
    this.users[index].password = password;

    return this.users[index];
  }
}

export default UsersRepository;
