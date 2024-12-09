//proyecto_nest/src/auth/interfaces/jwt-payload/jwt-payload.ts
export interface JwtPayload {

  /**
 * @interface JwtPayload
 * @description Define la estructura de los datos que se incluirán en el payload del token JWT.
 * El payload contiene la información que será firmada y almacenada dentro del token.
 */

    id: number;
    email: string;
    role: string;
  }