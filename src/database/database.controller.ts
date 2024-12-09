//proyecto_nest/src/database/database.controller.ts
import { Controller, Get } from '@nestjs/common';

import { DatabaseService } from './database.service';

@Controller('database') // Ruta base para las peticiones de base de datos
export class DatabaseController {
    constructor(private databaseService: DatabaseService) {}

  @Get('list-tables') // Ruta para listar las tablas
  async listTables() {
    return this.databaseService.listTables();
  }

}
