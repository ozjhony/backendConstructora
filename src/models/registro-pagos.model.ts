import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model({
  settings: {
    foreignKeys: {
      fk_proyecto_id: {
        name: 'fk_solicitud_id',
        entity: 'Solicitud',
        entityKey: 'codigo',
        foreignKey: 'solicitudId',
      },
    },
  },
})
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

  @belongsTo(() => Solicitud)
  solicitudId: number;

  constructor(data?: Partial<RegistroPagos>) {
    super(data);
  }
}

export interface RegistroPagosRelations {
  // describe navigational properties here
}

export type RegistroPagosWithRelations = RegistroPagos & RegistroPagosRelations;
