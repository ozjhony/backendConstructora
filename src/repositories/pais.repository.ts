import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Pais, PaisRelations, Ciudad} from '../models';
import {MysqlDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {CiudadRepository} from './ciudad.repository';

export class PaisRepository extends DefaultCrudRepository<
  Pais,
  typeof Pais.prototype.codigo,
  PaisRelations
> {

  public readonly ciudades: HasManyRepositoryFactory<Ciudad, typeof Pais.prototype.codigo>;

  constructor(
    @inject('datasources.mysqlDs') dataSource: MysqlDsDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>,
  ) {
    super(Pais, dataSource);
    this.ciudades = this.createHasManyRepositoryFactoryFor('ciudades', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudades', this.ciudades.inclusionResolver);
  }
}
