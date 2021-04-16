import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {TipoUsuario, TipoUsuarioRelations, Userlog} from '../models';
import {MongodbsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UserlogRepository} from './userlog.repository';

export class TipoUsuarioRepository extends DefaultCrudRepository<
  TipoUsuario,
  typeof TipoUsuario.prototype.id,
  TipoUsuarioRelations
> {

  public readonly userlogs: HasManyRepositoryFactory<Userlog, typeof TipoUsuario.prototype.id>;

  constructor(
    @inject('datasources.mongodbs') dataSource: MongodbsDataSource, @repository.getter('UserlogRepository') protected userlogRepositoryGetter: Getter<UserlogRepository>,
  ) {
    super(TipoUsuario, dataSource);
    this.userlogs = this.createHasManyRepositoryFactoryFor('userlogs', userlogRepositoryGetter,);
    this.registerInclusionResolver('userlogs', this.userlogs.inclusionResolver);
  }
}
