import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import Deposito from '../models/Depositos';

import DepositosRepository from '../repositories/DepositosRepository';
import CreateDepostioService from '../services/CreateDepositoServices';

const depositosRouter = Router();

depositosRouter.get('/', async (request, response) => {
  const depositosRepository = getCustomRepository(DepositosRepository);
  const depositos = await depositosRepository.find();
  return response.json(depositos);
});
depositosRouter.post('/', async (request, response) => {
  const { cliente, valor, banco, date, status, provider_id } = request.body;
  const createDeposito = new CreateDepostioService();
  const depostio = await createDeposito.execute({
    cliente,
    valor,
    banco,
    date,
    status,
    provider_id,
  });

  return response.json(depostio);
});

export default depositosRouter;
