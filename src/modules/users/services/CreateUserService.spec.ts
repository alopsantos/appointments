
import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateAppointment', () => {
  it('Should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user same email from another', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: '123456'
    });

    expect(
      createUser.execute({
      name: 'John Doe',
      email: 'johndoe@hotmail.com',
      password: '123456'
    })
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('Should not be able to create two Users on the same time', async () => {
  //   const fakeUsersRepository = new FakeUsersRepository();
  //   const createAppointment = new CreateUserService(
  //     fakeUsersRepository,
  //   );

  //   const appointmentDate = new Date(2021, 1, 7, 8);

  //   await createAppointment.execute({
  //     date: appointmentDate,
  //     provider_id: '1234567',
  //   });

  //   expect(
  //     createAppointment.execute({
  //       date: new Date(),
  //       provider_id: '1234567',
  //     }),
  //   ).rejects.toBeInstanceOf(AppError);
  // });
});
