import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDsDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Cliente, RegistroPagos} from '../models';
import {ClienteRepository} from './cliente.repository';
import {RegistroPagosRepository} from './registro-pagos.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.codigo,
  SolicitudRelations
> {

  public readonly cliente: BelongsToAccessor<Cliente, typeof Solicitud.prototype.codigo>;

  public readonly registroPagos: HasManyRepositoryFactory<RegistroPagos, typeof Solicitud.prototype.codigo>;

  constructor(
    @inject('datasources.mysqlDs') dataSource: MysqlDsDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('RegistroPagosRepository') protected registroPagosRepositoryGetter: Getter<RegistroPagosRepository>,
  ) {
    super(Solicitud, dataSource);
    this.registroPagos = this.createHasManyRepositoryFactoryFor('registroPagos', registroPagosRepositoryGetter,);
    this.registerInclusionResolver('registroPagos', this.registroPagos.inclusionResolver);
    this.cliente = this.createBelongsToAccessorFor('cliente', clienteRepositoryGetter,);
    this.registerInclusionResolver('cliente', this.cliente.inclusionResolver);
  }
}
