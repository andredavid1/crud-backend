import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '../CreateUserService';
import UpdateUserService from '../UpdateUserService';

describe('UpdateUserService', () => {
  it('should be able to update a user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const updateUser = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'user',
      email: 'email@email.com',
      password: 'password',
    });

    const response = await updateUser.execute({
      id: user.id,
      name: 'newName',
      email: 'newemail@email.com',
      password: 'newPassword',
    });

    expect(response.name).toBe('newName');
    expect(response.email).toBe('newemail@email.com');
    expect(response.password).toBe('newPassword');
  });

  it('should not be able to update a user with inexistent id', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const updateUser = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      updateUser.execute({
        id: 'wrongId',
        name: 'user',
        email: 'email@email.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a user with a email already registred', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const updateUser = new UpdateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user1 = await createUser.execute({
      name: 'user1',
      email: 'email@user1.com',
      password: 'password',
    });

    const user2 = await createUser.execute({
      name: 'user2',
      email: 'email@user2.com',
      password: 'password',
    });

    expect(
      updateUser.execute({
        id: user2.id,
        name: 'user2',
        email: user1.email,
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
