import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  InformacionFinanciera,
  Cliente,
} from '../models';
import {InformacionFinancieraRepository} from '../repositories';

export class InformacionFinancieraClienteController {
  constructor(
    @repository(InformacionFinancieraRepository)
    public informacionFinancieraRepository: InformacionFinancieraRepository,
  ) { }

  @get('/informacion-financieras/{id}/cliente', {
    responses: {
      '200': {
        description: 'Cliente belonging to InformacionFinanciera',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async getCliente(
    @param.path.number('id') id: typeof InformacionFinanciera.prototype.id,
  ): Promise<Cliente> {
    return this.informacionFinancieraRepository.cliente(id);
  }
}
