import {Entity, model, property} from '@loopback/repository';

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
    type: 'string',
    required: true,
  })
  clave: string;


  constructor(data?: Partial<Userlog>) {
    super(data);
  }
}

export interface UserlogRelations {
  // describe navigational properties here
}

export type UserlogWithRelations = Userlog & UserlogRelations;
