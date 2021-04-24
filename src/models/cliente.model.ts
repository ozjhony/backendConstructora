import {belongsTo, Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {InformacionFinanciera} from './informacion-financiera.model';
import {Solicitud} from './solicitud.model';

@model()
export class Cliente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;


  @property({
    type: 'string',
  })
  cedula?: string;


  @property({
    type: 'date',
  })
  fecha_nacimiento?: string;

  @property({
    type: 'string',
  })
  foto?: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @belongsTo(() => Ciudad)
  ciudadId: number;

  @hasOne(() => InformacionFinanciera)
  informacionFinanciera: InformacionFinanciera;

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  constructor(data?: Partial<Cliente>) {
    super(data);
  }
}

export interface ClienteRelations {
  // describe navigational properties here
}

export type ClienteWithRelations = Cliente & ClienteRelations;
