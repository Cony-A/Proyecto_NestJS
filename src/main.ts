//proyecto_nest/src/main.ts
import { NestFactory } from '@nestjs/core'; // Permite crear la instancia principal de la aplicación NestJS
import { AppModule } from './app.module'; // Importa el módulo principal de la aplicación
import { ValidationPipe } from '@nestjs/common';  // Importa ValidationPipe, el pipe para validaciones

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // Crea una nueva instancia de la aplicación con AppModule

   // Habilita la validación global para todas las solicitudes
   app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000); // Inicia el servidor en el puerto definido (3000 por defecto)
}
bootstrap();
