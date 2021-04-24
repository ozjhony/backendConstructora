import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {RegistroPagos} from '../models';
import {RegistroPagosRepository} from '../repositories';

export class RegistroPagosController {
  constructor(
    @repository(RegistroPagosRepository)
    public registroPagosRepository : RegistroPagosRepository,
  ) {}

  @post('/registro-pagos')
  @response(200, {
    description: 'RegistroPagos model instance',
    content: {'application/json': {schema: getModelSchemaRef(RegistroPagos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroPagos, {
            title: 'NewRegistroPagos',
            exclude: ['id'],
          }),
        },
      },
    })
    registroPagos: Omit<RegistroPagos, 'id'>,
  ): Promise<RegistroPagos> {
    return this.registroPagosRepository.create(registroPagos);
  }

  @get('/registro-pagos/count')
  @response(200, {
    description: 'RegistroPagos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(RegistroPagos) where?: Where<RegistroPagos>,
  ): Promise<Count> {
    return this.registroPagosRepository.count(where);
  }

  @get('/registro-pagos')
  @response(200, {
    description: 'Array of RegistroPagos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(RegistroPagos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(RegistroPagos) filter?: Filter<RegistroPagos>,
  ): Promise<RegistroPagos[]> {
    return this.registroPagosRepository.find(filter);
  }

  @patch('/registro-pagos')
  @response(200, {
    description: 'RegistroPagos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroPagos, {partial: true}),
        },
      },
    })
    registroPagos: RegistroPagos,
    @param.where(RegistroPagos) where?: Where<RegistroPagos>,
  ): Promise<Count> {
    return this.registroPagosRepository.updateAll(registroPagos, where);
  }

  @get('/registro-pagos/{id}')
  @response(200, {
    description: 'RegistroPagos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(RegistroPagos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RegistroPagos, {exclude: 'where'}) filter?: FilterExcludingWhere<RegistroPagos>
  ): Promise<RegistroPagos> {
    return this.registroPagosRepository.findById(id, filter);
  }

  @patch('/registro-pagos/{id}')
  @response(204, {
    description: 'RegistroPagos PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroPagos, {partial: true}),
        },
      },
    })
    registroPagos: RegistroPagos,
  ): Promise<void> {
    await this.registroPagosRepository.updateById(id, registroPagos);
  }

  @put('/registro-pagos/{id}')
  @response(204, {
    description: 'RegistroPagos PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() registroPagos: RegistroPagos,
  ): Promise<void> {
    await this.registroPagosRepository.replaceById(id, registroPagos);
  }

  @del('/registro-pagos/{id}')
  @response(204, {
    description: 'RegistroPagos DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.registroPagosRepository.deleteById(id);
  }
}
