import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Inmueble, InmuebleRelations, Bloque} from '../models';
import {MysqlDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {BloqueRepository} from './bloque.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.codigo,
  InmuebleRelations
> {

  public readonly bloque: BelongsToAccessor<Bloque, typeof Inmueble.prototype.codigo>;

  constructor(
    @inject('datasources.mysqlDs') dataSource: MysqlDsDataSource, @repository.getter('BloqueRepository') protected bloqueRepositoryGetter: Getter<BloqueRepository>,
  ) {
    super(Inmueble, dataSource);
    this.bloque = this.createBelongsToAccessorFor('bloque', bloqueRepositoryGetter,);
    this.registerInclusionResolver('bloque', this.bloque.inclusionResolver);
  }
}
