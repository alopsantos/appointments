import { EntityRepository, Repository } from 'typeorm';

import Deposito from '../models/Depositos';

@EntityRepository(Deposito)
class DepositosRepository extends Repository<Deposito> {

  public async findByDate(provider_id: Date): Promise<Deposito | null>{

    const findDeposito = await this.findOne({
      where: {provider_id}
    });

    return findDeposito || null;
  }

}

export default DepositosRepository
