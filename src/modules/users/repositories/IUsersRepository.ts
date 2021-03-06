import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import IUpdatePasswordDTO from '../dtos/IUpdatePasswordDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUsersRepository {
  create(userData: ICreateUserDTO): Promise<User>;
  findAll(): Promise<User[] | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  update(userData: IUpdateUserDTO): Promise<User>;
  updatePassword(userData: IUpdatePasswordDTO): Promise<User>;
}
