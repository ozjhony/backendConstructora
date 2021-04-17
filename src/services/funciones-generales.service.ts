import { /* inject, */ BindingScope, injectable} from '@loopback/core';

const generator = require('generate-password');
const cryptoJS = require("crypto-js");
@injectable({scope: BindingScope.TRANSIENT})
export class FuncionesGeneralesService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Funcion para generar claves
   */

  GenerarClaveAleatoria(): string {


    let clave = generator.generate({
      length: 10,
      numbers: true,
      symbols: false,
      uppercase: true,
      lowercase: true
    });
    return clave;
  }
  /**
   * funcion para cifrar una cadena
   *
   */

  CifrarTexto(texto: string): string {
    let textoCifrado = cryptoJS.MD5(texto).toString();
    return textoCifrado;
  }
}
