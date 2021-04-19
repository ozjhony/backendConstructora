export namespace Keys {
  export const origenCorreoElectronico = 'jhony.1701521539@ucaldas.edu.co';
  export const asuntoNuevoUsuario = '[Nuevo Usuario Constructora] Mensaje de Bienvenida';
  export const tiempoVencimientoJWT = Math.floor(Date.now() / 1000) + (60 * 60 * 12);
  export const claveSecretaJWT = 'jwt@proyectoProg3';
  export const twilioPhone = '+12012583939';
  export const carpetaImagenPersonas = '../../archivos/personas';
  export const nombreCampoImagenPersona = 'file';
  export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
  export const tamMaxImagenPersona = 1024 * 1024;
  export const carpetaDocumentoPersona = '../../archivos/documentos';
  export const nombreCampoDocumentoPersona = 'file';
  export const extensionesPermitidasDOC: string[] = ['.PDF', '.DOC', '.DOCX', '.XLS', '.XLSX'];
}
