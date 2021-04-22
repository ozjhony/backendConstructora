import {belongsTo, Entity, model, property} from '@loopback/repository';
import {TipoUsuario} from './tipo-usuario.model';

@model()
export class Userlog extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_usuario: string;

  @property({
    type: 'string'
  })
  clave?: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @belongsTo(() => TipoUsuario)
  tipoUsuarioId: string;

  constructor(data?: Partial<Userlog>) {
    super(data);
  }
}

export interface UserlogRelations {
  // describe navigational properties here
}

export type UserlogWithRelations = Userlog & UserlogRelations;
