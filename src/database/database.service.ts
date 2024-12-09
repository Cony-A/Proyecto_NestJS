//proyecto_nest/src/database/database.service.ts
import { Injectable } from '@nestjs/common';

import { DataSource } from 'typeorm'; // Importa DataSource

@Injectable()
export class DatabaseService {

    constructor(private dataSource: DataSource) {} // Inyecta directamente DataSource

  // Método para listar tablas existentes
  async listTables(): Promise<any> {
    // Ejecuta una consulta para listar las tablas
    const result = await this.dataSource.query('SHOW TABLES');
    return result;
  }
}
