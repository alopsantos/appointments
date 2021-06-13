import { getRepository } from 'typeorm';
import Deposito from '../models/Depositos';

interface IDeposito{
  provider_id: string,
  cliente: string,
  valor: number,
  date: Date,
  banco: string,
  status: number,
}

class CreateDepositoServices{
  public async execute({ provider_id, cliente, valor, date, status, banco }: IDeposito): Promise<Deposito>{

    const depositoRepository = getRepository(Deposito);

    const deposito = depositoRepository.create({
      cliente, valor, banco, date, status, provider_id
    })
    await depositoRepository.save(deposito);

    return deposito;
  }
}
export default CreateDepositoServices;
