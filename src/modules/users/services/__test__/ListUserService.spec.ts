import FakeUserRepository from '../../repositories/fakes/FakeUsersRepository';
import CreateUserService from '../CreateUserService';
import ListUserService from '../ListUserService';
import FakeHashProvider from '../../providers/HashProvider/fakes/FakeHashProvider';

describe('ListUsersService', () => {
  it('should be able to list the existents users', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const listUsers = new ListUserService(fakeUserRepository);

    const user1 = await createUser.execute({
      name: 'User1',
      email: 'email@user1.com',
      password: '010203',
    });

    const user2 = await createUser.execute({
      name: 'User2',
      email: 'email@user2.com',
      password: '010203',
    });

    const users = await listUsers.execute();

    expect(users).toEqual([user1, user2]);
  });
});
