import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Userlog,
  TipoUsuario,
} from '../models';
import {UserlogRepository} from '../repositories';

export class UserlogTipoUsuarioController {
  constructor(
    @repository(UserlogRepository)
    public userlogRepository: UserlogRepository,
  ) { }

  @get('/userlogs/{id}/tipo-usuario', {
    responses: {
      '200': {
        description: 'TipoUsuario belonging to Userlog',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoUsuario)},
          },
        },
      },
    },
  })
  async getTipoUsuario(
    @param.path.string('id') id: typeof Userlog.prototype.id,
  ): Promise<TipoUsuario> {
    return this.userlogRepository.tipoUsuario(id);
  }
}
