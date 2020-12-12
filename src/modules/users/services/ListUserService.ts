import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

class ListUserService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute(): Promise<User[] | undefined> {
    const users = this.usersRepository.findAll();

    return users;
  }
}

export default ListUserService;
