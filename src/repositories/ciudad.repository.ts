import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Ciudad, CiudadRelations, Pais, Proyecto} from '../models';
import {MysqlDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PaisRepository} from './pais.repository';
import {ProyectoRepository} from './proyecto.repository';

export class CiudadRepository extends DefaultCrudRepository<
  Ciudad,
  typeof Ciudad.prototype.codigo,
  CiudadRelations
> {

  public readonly pais: BelongsToAccessor<Pais, typeof Ciudad.prototype.codigo>;

  public readonly proyectos: HasManyRepositoryFactory<Proyecto, typeof Ciudad.prototype.codigo>;

  constructor(
    @inject('datasources.mysqlDs') dataSource: MysqlDsDataSource, @repository.getter('PaisRepository') protected paisRepositoryGetter: Getter<PaisRepository>, @repository.getter('ProyectoRepository') protected proyectoRepositoryGetter: Getter<ProyectoRepository>,
  ) {
    super(Ciudad, dataSource);
    this.proyectos = this.createHasManyRepositoryFactoryFor('proyectos', proyectoRepositoryGetter,);
    this.registerInclusionResolver('proyectos', this.proyectos.inclusionResolver);
    this.pais = this.createBelongsToAccessorFor('pais', paisRepositoryGetter,);
    this.registerInclusionResolver('pais', this.pais.inclusionResolver);
  }
}
