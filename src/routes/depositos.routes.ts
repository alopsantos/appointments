import { Router } from 'express';

import CreateDepostioService from '../services/CreateDepositoServices';

const depositosRouter = Router();

depositosRouter.get('/', async (request, response) => {

});
depositosRouter.post('/', async (request, response) => {
  const { cliente, valor, banco, date, provider_id } = request.body;
  console.log(request.body)
  const createDeposito = new CreateDepostioService();
  const depostio = await createDeposito.execute({
    cliente,
    valor,
    banco,
    date,
    provider_id,
  });

  return response.json(depostio);
});

export default depositosRouter;
