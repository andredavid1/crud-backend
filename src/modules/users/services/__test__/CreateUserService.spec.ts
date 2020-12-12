import FakeUserRepository from '../../repositories/fakes/FakeUsersRepository';
import CreateUserService from '../CreateUserService';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const createUser = new CreateUserService(fakeUserRepository);

    const user = await createUser.execute({
      name: 'user',
      email: 'user@email.com',
      password: 'password',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('user');
    expect(user.email).toBe('user@email.com');
  });
});
