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
  Solicitud,
  RegistroPagos,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudRegistroPagosController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/registro-pagos', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many RegistroPagos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RegistroPagos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<RegistroPagos>,
  ): Promise<RegistroPagos[]> {
    return this.solicitudRepository.registroPagos(id).find(filter);
  }

  @post('/solicituds/{id}/registro-pagos', {
    responses: {
      '200': {
        description: 'Solicitud model instance',
        content: {'application/json': {schema: getModelSchemaRef(RegistroPagos)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.codigo,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroPagos, {
            title: 'NewRegistroPagosInSolicitud',
            exclude: ['id'],
            optional: ['solicitudId']
          }),
        },
      },
    }) registroPagos: Omit<RegistroPagos, 'id'>,
  ): Promise<RegistroPagos> {
    return this.solicitudRepository.registroPagos(id).create(registroPagos);
  }

  @patch('/solicituds/{id}/registro-pagos', {
    responses: {
      '200': {
        description: 'Solicitud.RegistroPagos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RegistroPagos, {partial: true}),
        },
      },
    })
    registroPagos: Partial<RegistroPagos>,
    @param.query.object('where', getWhereSchemaFor(RegistroPagos)) where?: Where<RegistroPagos>,
  ): Promise<Count> {
    return this.solicitudRepository.registroPagos(id).patch(registroPagos, where);
  }

  @del('/solicituds/{id}/registro-pagos', {
    responses: {
      '200': {
        description: 'Solicitud.RegistroPagos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(RegistroPagos)) where?: Where<RegistroPagos>,
  ): Promise<Count> {
    return this.solicitudRepository.registroPagos(id).delete(where);
  }
}
