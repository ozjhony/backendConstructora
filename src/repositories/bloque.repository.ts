import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Bloque, BloqueRelations, Proyecto, Inmueble} from '../models';
import {MysqlDsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {ProyectoRepository} from './proyecto.repository';
import {InmuebleRepository} from './inmueble.repository';

export class BloqueRepository extends DefaultCrudRepository<
  Bloque,
  typeof Bloque.prototype.codigo,
  BloqueRelations
> {

  public readonly proyecto: BelongsToAccessor<Proyecto, typeof Bloque.prototype.codigo>;

  public readonly inmuebles: HasManyRepositoryFactory<Inmueble, typeof Bloque.prototype.codigo>;

  constructor(
    @inject('datasources.mysqlDs') dataSource: MysqlDsDataSource, @repository.getter('ProyectoRepository') protected proyectoRepositoryGetter: Getter<ProyectoRepository>, @repository.getter('InmuebleRepository') protected inmuebleRepositoryGetter: Getter<InmuebleRepository>,
  ) {
    super(Bloque, dataSource);
    this.inmuebles = this.createHasManyRepositoryFactoryFor('inmuebles', inmuebleRepositoryGetter,);
    this.registerInclusionResolver('inmuebles', this.inmuebles.inclusionResolver);
    this.proyecto = this.createBelongsToAccessorFor('proyecto', proyectoRepositoryGetter,);
    this.registerInclusionResolver('proyecto', this.proyecto.inclusionResolver);
  }
}
