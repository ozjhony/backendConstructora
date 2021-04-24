import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  RegistroPagos,
  Solicitud,
} from '../models';
import {RegistroPagosRepository} from '../repositories';

export class RegistroPagosSolicitudController {
  constructor(
    @repository(RegistroPagosRepository)
    public registroPagosRepository: RegistroPagosRepository,
  ) { }

  @get('/registro-pagos/{id}/solicitud', {
    responses: {
      '200': {
        description: 'Solicitud belonging to RegistroPagos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitud)},
          },
        },
      },
    },
  })
  async getSolicitud(
    @param.path.number('id') id: typeof RegistroPagos.prototype.id,
  ): Promise<Solicitud> {
    return this.registroPagosRepository.solicitud(id);
  }
}
