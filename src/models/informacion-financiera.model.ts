import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Cliente} from './cliente.model';

@model()
export class InformacionFinanciera extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  totalIngreso: number;

  @property({
    type: 'string',
    required: true,
  })
  telefonoTrabajo: string;

  @property({
    type: 'string',
    required: true,
  })
  cargo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreReferenciaFamiliar: string;

  @property({
    type: 'number',
    required: true,
  })
  telefonoReferenciaFamiliar: number;

  @property({
    type: 'string',
    required: true,
  })
  nombreReferenciaPersonal: string;

  @property({
    type: 'string',
    required: true,
  })
  telefonoReferenciaPersonal: string;

  @property({
    type: 'date',
    required: true,
  })
  tiempoTrabajoActual: string;

  @belongsTo(() => Cliente)
  clienteId: number;

  constructor(data?: Partial<InformacionFinanciera>) {
    super(data);
  }
}

export interface InformacionFinancieraRelations {
  // describe navigational properties here
}

export type InformacionFinancieraWithRelations = InformacionFinanciera & InformacionFinancieraRelations;