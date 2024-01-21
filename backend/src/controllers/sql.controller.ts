import { Controller, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import SqlConfigService from '../services/sqlConfig.service';
import CMSController from './base.controller';

interface SqlRequest {
    type: "mysql" | "mariadb",
    username: string,
    password: string,
    database: string,
    host: string,
    port: number
}

@Controller('sql')
export class SQLController extends CMSController {
  constructor(private readonly sqlConfigService: SqlConfigService) { super() }

  @Post()
  create(@Req() request: Request, @Res() response: Response) {
    const params: SqlRequest = request.body;
    this.sqlConfigService
        .setType(params.type)
        .setUsername(params.username)
        .setPassword(params.password)
        .setDatabase(params.database)
        .setHost(params.host)
        .setPort(params.port)
        .save()
    
    response.json(this.defaultOk("Please restart the backoffice manually, and ensure the connection works"));
    process.exit(1);
  }
}
