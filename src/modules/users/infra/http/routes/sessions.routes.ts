import { Router } from 'express';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const usersRepository = new UserRepository();
  const authenticateUserService = new AuthenticateUserService(usersRepository);

  const { user, token } = await authenticateUserService.execute({
    email, password
  });
  // delete user.password; //eslintignore

  return response.json({ user, token });
});

export default sessionsRouter;
