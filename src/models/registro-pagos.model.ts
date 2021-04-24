import {Entity, model, property} from '@loopback/repository';

@model()
export class RegistroPagos extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaPagos: string;

  @property({
    type: 'number',
    required: true,
  })
  aporte: number;

  @property({
    type: 'number',
    required: true,
  })
  valorTotal: number;


  constructor(data?: Partial<RegistroPagos>) {
    super(data);
  }
}

export interface RegistroPagosRelations {
  // describe navigational properties here
}

export type RegistroPagosWithRelations = RegistroPagos & RegistroPagosRelations;
