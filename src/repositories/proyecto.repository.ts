import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Proyecto, ProyectoRelations, Ciudad, Bloque} from '../models';
import {MysqlDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CiudadRepository} from './ciudad.repository';
import {BloqueRepository} from './bloque.repository';

export class ProyectoRepository extends DefaultCrudRepository<
  Proyecto,
  typeof Proyecto.prototype.codigo,
  ProyectoRelations
> {

  public readonly ciudad: BelongsToAccessor<Ciudad, typeof Proyecto.prototype.codigo>;

  public readonly bloques: HasManyRepositoryFactory<Bloque, typeof Proyecto.prototype.codigo>;

  constructor(
    @inject('datasources.mysqlDs') dataSource: MysqlDsDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('BloqueRepository') protected bloqueRepositoryGetter: Getter<BloqueRepository>,
  ) {
    super(Proyecto, dataSource);
    this.bloques = this.createHasManyRepositoryFactoryFor('bloques', bloqueRepositoryGetter,);
    this.registerInclusionResolver('bloques', this.bloques.inclusionResolver);
    this.ciudad = this.createBelongsToAccessorFor('ciudad', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
  }
}
