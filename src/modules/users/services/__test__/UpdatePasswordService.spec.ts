import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from '../CreateUserService';
import UpdatePasswordService from '../UpdatePasswordService';

describe('UpdatePasswordService', () => {
  it('should be able to update a password of user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const updatePassword = new UpdatePasswordService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'user',
      email: 'email@email.com',
      password: 'password',
    });

    const response = await updatePassword.execute({
      id: user.id,
      password: 'password',
      newPassword: 'newPassword',
    });

    expect(response.password).toBe('newPassword');
  });

  it('should not be able to update a password of user with inexistent id', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const updateUser = new UpdatePasswordService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    expect(
      updateUser.execute({
        id: 'wrongId',
        password: 'password',
        newPassword: 'newPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update a password of user with wrong old password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const updatePassword = new UpdatePasswordService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'user',
      email: 'email@email.com',
      password: 'password',
    });

    expect(
      updatePassword.execute({
        id: user.id,
        password: 'wrongPassword',
        newPassword: 'newPassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
