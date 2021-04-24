import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDsDataSource} from '../datasources';
import {RegistroPagos, RegistroPagosRelations} from '../models';

export class RegistroPagosRepository extends DefaultCrudRepository<
  RegistroPagos,
  typeof RegistroPagos.prototype.id,
  RegistroPagosRelations
> {
  constructor(
    @inject('datasources.mysqlDs') dataSource: MysqlDsDataSource,
  ) {
    super(RegistroPagos, dataSource);
  }
}
