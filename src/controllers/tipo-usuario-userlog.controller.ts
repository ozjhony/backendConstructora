import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  TipoUsuario,
  Userlog,
} from '../models';
import {TipoUsuarioRepository} from '../repositories';

export class TipoUsuarioUserlogController {
  constructor(
    @repository(TipoUsuarioRepository) protected tipoUsuarioRepository: TipoUsuarioRepository,
  ) { }

  @get('/tipo-usuarios/{id}/userlogs', {
    responses: {
      '200': {
        description: 'Array of TipoUsuario has many Userlog',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Userlog)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Userlog>,
  ): Promise<Userlog[]> {
    return this.tipoUsuarioRepository.userlogs(id).find(filter);
  }

  @post('/tipo-usuarios/{id}/userlogs', {
    responses: {
      '200': {
        description: 'TipoUsuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Userlog)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof TipoUsuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userlog, {
            title: 'NewUserlogInTipoUsuario',
            exclude: ['id'],
            optional: ['tipoUsuarioId']
          }),
        },
      },
    }) userlog: Omit<Userlog, 'id'>,
  ): Promise<Userlog> {
    return this.tipoUsuarioRepository.userlogs(id).create(userlog);
  }

  @patch('/tipo-usuarios/{id}/userlogs', {
    responses: {
      '200': {
        description: 'TipoUsuario.Userlog PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userlog, {partial: true}),
        },
      },
    })
    userlog: Partial<Userlog>,
    @param.query.object('where', getWhereSchemaFor(Userlog)) where?: Where<Userlog>,
  ): Promise<Count> {
    return this.tipoUsuarioRepository.userlogs(id).patch(userlog, where);
  }

  @del('/tipo-usuarios/{id}/userlogs', {
    responses: {
      '200': {
        description: 'TipoUsuario.Userlog DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Userlog)) where?: Where<Userlog>,
  ): Promise<Count> {
    return this.tipoUsuarioRepository.userlogs(id).delete(where);
  }
}
