import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys as llave} from '../config/keys';
import {Userlog} from '../models';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class SesionService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * funcion que genera un token jwt
   */

  GenerarToken(userlog: Userlog): string {
    let tk = jwt.sign({
      exp: llave.tiempoVencimientoJWT,
      data: {
        username: userlog.nombre_usuario,
        role: userlog.tipoUsuarioId
      }
    }, llave.claveSecretaJWT);
    return tk;
  }


  /**
   * Verificar la validéz de un token JWT
   */
  VerificarTokenJWT(token: string) {
    try {
      let decoded = jwt.verify(token, llave.claveSecretaJWT);
      return decoded;
    } catch {
      return null;
    }
  }
}
