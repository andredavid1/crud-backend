import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '../CreateUserService';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'password',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('user');
  });

  it('should not be able to create a user with an already registered email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'user',
      email: 'email@email.com',
      password: 'password',
    });

    expect(
      createUser.execute({
        name: 'user2',
        email: 'email@email.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
