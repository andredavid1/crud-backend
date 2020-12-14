import ISessionsRepository from '@modules/users/repositories/ISessionsRepository';
import User from '@modules/users/infra/typeorm/entities/User';

class SessionsRepository implements ISessionsRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }
}

export default SessionsRepository;
