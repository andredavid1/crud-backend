import User from '../infra/typeorm/entities/User';

export default interface IUpdateUserDTO {
  user: User;
  password: string;
}
