import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDsDataSource} from '../datasources';
import {InformacionFinanciera, InformacionFinancieraRelations, Cliente} from '../models';
import {ClienteRepository} from './cliente.repository';

export class InformacionFinancieraRepository extends DefaultCrudRepository<
  InformacionFinanciera,
  typeof InformacionFinanciera.prototype.id,
  InformacionFinancieraRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof InformacionFinanciera.prototype.id>;

  constructor(
    @inject('datasources.mysqlDs') dataSource: MysqlDsDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(InformacionFinanciera, dataSource);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
