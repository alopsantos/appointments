import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import User from '../../infra/typeorm/entities/User';
import { uuid } from 'uuidv4';

class UserRepository implements IUsersRepository {
  private users: User[] = [];

  // public async findAllProviders({
  //   except_user_id,
  // }: IFindAllProvidersDTO): Promise<void> {


  //   if (except_user_id) {
  //     users = await this.ormRepository.find({
  //       where: {
  //         id: Not(except_user_id),
  //       },
  //     });
  //   } else {
  //     users = await this.ormRepository.find();
  //   }

  //   return users;
  // }

  public async findById(id: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.id === id);
    return findUser;
  }
  public async findByEmail(email: string): Promise<User | undefined> {
    const findUser = this.users.find(user => user.email === email);

    return findUser;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, {id: uuid()}, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise<User> {
    const findIndex = this.users.findIndex(findUser => findUser.id === user.id);
    this.users[findIndex] = user;
    return user;
  }
}

export default UserRepository;
