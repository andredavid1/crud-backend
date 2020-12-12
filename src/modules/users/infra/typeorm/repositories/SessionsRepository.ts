import ISessionsRepository from '@modules/users/repositories/ISessionsRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class SessionsRepository implements ISessionsRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });
    return user;
  }
}

export default SessionsRepository;
