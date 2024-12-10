//proyecto_nest/src/auth/auth.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common'; // Importa los decoradores y clases necesarias de NestJ
import * as jwt from 'jsonwebtoken'; // Importa la librería jsonwebtoken para verificar el token JWT
import { Request, Response, NextFunction } from 'express'; // Importa los tipos de Request, Response y NextFunction de Express para trabajar con las solicitudes HTTP

// NOTA: Se usó 'jsonwebtoken' para firmar manualmente y verificar el token JWT debido a problemas con JwtService de NestJS.
// La firma manual fue la única solución que funcionó para devolver el token correctamente.
// Se conserva JwService en el código como parte de la documentación y/o para posibles usos a futuro o correciones
//Para usar jsonwebtoken, descargar dependencias: npm install jsonwebtoken

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  // Método 'use' que se ejecuta en cada solicitud HTTP
  use(req: Request, res: Response, next: NextFunction) {
    // Extrae el token del encabezado 'Authorization' de la solicitud
    const token = req.headers['authorization']?.split(' ')[1];  // Extraemos el token del header

    // Si no se proporciona el token, se devuelve un error 401 (Acceso denegado)
    if (!token) {
      return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
    }

    // Obtiene la clave secreta JWT del archivo .env
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT_SECRET no está definida en el archivo .env' });
    }

    try {
      // Verificar el token con la clave secreta cargada desde .env
      const decoded = jwt.verify(token, jwtSecret);  // Usamos el token con la clave secreta
      req.user = decoded;  // Agregamos los datos del usuario a la solicitud
      console.log('Usuario decodificado en el middleware:', req.user);
      next();  // Continuamos con la ejecución
    } catch (error) {
      return res.status(401).json({ message: 'Acceso denegado, token inválido' });
    }
  }
}
