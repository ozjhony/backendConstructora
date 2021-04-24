import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDsDataSource} from '../datasources';
import {RegistroPagos, RegistroPagosRelations, Solicitud} from '../models';
import {SolicitudRepository} from './solicitud.repository';

export class RegistroPagosRepository extends DefaultCrudRepository<
  RegistroPagos,
  typeof RegistroPagos.prototype.id,
  RegistroPagosRelations
> {

  public readonly solicitud: BelongsToAccessor<Solicitud, typeof RegistroPagos.prototype.id>;

  constructor(
    @inject('datasources.mysqlDs') dataSource: MysqlDsDataSource, @repository.getter('SolicitudRepository') protected solicitudRepositoryGetter: Getter<SolicitudRepository>,
  ) {
    super(RegistroPagos, dataSource);
    this.solicitud = this.createBelongsToAccessorFor('solicitud', solicitudRepositoryGetter,);
    this.registerInclusionResolver('solicitud', this.solicitud.inclusionResolver);
  }
}
