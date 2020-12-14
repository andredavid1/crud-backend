import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeSessionsRepository from '@modules/users/repositories/fakes/FakeSessionsRepository';
import AuthenticateUserService from '../AuthenticateUserService';

describe('CreateSessionService', () => {
  it('should be able to authenticate', async () => {
    const fakeSessionsRepository = new FakeSessionsRepository();

    const authenticate = new AuthenticateUserService(fakeSessionsRepository);

    const user = await authenticate.execute({
      email: 'user@email.com',
      password: 'password',
    });

    expect(user).toHaveProperty('id');
  });
});
