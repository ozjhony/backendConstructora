import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Userlog, UserlogRelations, TipoUsuario} from '../models';
import {MongodbsDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {TipoUsuarioRepository} from './tipo-usuario.repository';

export class UserlogRepository extends DefaultCrudRepository<
  Userlog,
  typeof Userlog.prototype.id,
  UserlogRelations
> {

  public readonly tipoUsuario: BelongsToAccessor<TipoUsuario, typeof Userlog.prototype.id>;

  constructor(
    @inject('datasources.mongodbs') dataSource: MongodbsDataSource, @repository.getter('TipoUsuarioRepository') protected tipoUsuarioRepositoryGetter: Getter<TipoUsuarioRepository>,
  ) {
    super(Userlog, dataSource);
    this.tipoUsuario = this.createBelongsToAccessorFor('tipoUsuario', tipoUsuarioRepositoryGetter,);
    this.registerInclusionResolver('tipoUsuario', this.tipoUsuario.inclusionResolver);
  }
}
