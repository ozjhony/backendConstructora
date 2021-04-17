import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody
} from '@loopback/rest';
import {Keys as llaves} from '../config/keys';
import {Userlog} from '../models';
import {UserlogRepository} from '../repositories';
import {FuncionesGeneralesService, NotificacionesService} from '../services';

export class UserlogController {
  constructor(
    @repository(UserlogRepository)
    public userlogRepository: UserlogRepository,
    @service(FuncionesGeneralesService)
    public servicioFunciones: FuncionesGeneralesService,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService
  ) { }

  @post('/userlogs', {
    responses: {
      '200': {
        description: 'Userlog model instance',
        content: {'application/json': {schema: getModelSchemaRef(Userlog)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userlog, {
            title: 'NewUserlog',
            exclude: ['id', 'clave'],
          }),
        },
      },
    })
    userlog: Omit<Userlog, 'id'>,
  ): Promise<Userlog> {

    let claveAleatoria = this.servicioFunciones.GenerarClaveAleatoria();
    console.log(claveAleatoria);
    let claveCifrada = this.servicioFunciones.CifrarTexto(claveAleatoria);
    console.log(claveCifrada);
    userlog.clave = claveCifrada;
    let userlogCreado = await this.userlogRepository.create(userlog);

    let contenido = `Hola, buen día. <br />Usted ha sido registrado en plataforma de nuestra constructora. Sus credenciales de acceso son: <br />
      <ul>
        <li>Usuario: ${userlogCreado.nombre_usuario}</li>
        <li>Contraseña: ${claveAleatoria}</li>
      </ul>

      `;


    if (userlogCreado) {
      this.servicioNotificaciones.enviarCorreoElectronico(userlogCreado.nombre_usuario, llaves.origenCorreoElectronico, contenido);
    }

    //notificacion via email
    return userlogCreado;
  }

  @get('/userlogs/count', {
    responses: {
      '200': {
        description: 'Userlog model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(Userlog) where?: Where<Userlog>,
  ): Promise<Count> {
    return this.userlogRepository.count(where);
  }

  @get('/userlogs', {
    responses: {
      '200': {
        description: 'Array of Userlog model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Userlog, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Userlog) filter?: Filter<Userlog>,
  ): Promise<Userlog[]> {
    return this.userlogRepository.find(filter);
  }

  @patch('/userlogs', {
    responses: {
      '200': {
        description: 'Userlog PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userlog, {partial: true}),
        },
      },
    })
    userlog: Userlog,
    @param.where(Userlog) where?: Where<Userlog>,
  ): Promise<Count> {
    return this.userlogRepository.updateAll(userlog, where);
  }

  @get('/userlogs/{id}', {
    responses: {
      '200': {
        description: 'Userlog model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Userlog, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Userlog, {exclude: 'where'}) filter?: FilterExcludingWhere<Userlog>
  ): Promise<Userlog> {
    return this.userlogRepository.findById(id, filter);
  }

  @patch('/userlogs/{id}', {
    responses: {
      '204': {
        description: 'Userlog PATCH success',
      },
    },
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userlog, {partial: true}),
        },
      },
    })
    userlog: Userlog,
  ): Promise<void> {
    await this.userlogRepository.updateById(id, userlog);
  }

  @put('/userlogs/{id}', {
    responses: {
      '204': {
        description: 'Userlog PUT success',
      },
    },
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() userlog: Userlog,
  ): Promise<void> {
    await this.userlogRepository.replaceById(id, userlog);
  }

  @del('/userlogs/{id}', {
    responses: {
      '204': {
        description: 'Userlog DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.userlogRepository.deleteById(id);
  }
}
