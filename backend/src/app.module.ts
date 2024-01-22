import { Module } from '@nestjs/common';
import controllers from './controllers';
import services from './services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

require('dotenv').config();

const imports = [
  TypeOrmModule.forRoot({
    type: 'mysql',
    host: process.env.DBHOST,
    port: 25060,
    username: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DB,
    entities: [User],
    synchronize: true
})
];

@Module({
  imports,
  controllers: [...controllers],
  providers: [...services],
})
export class AppModule {}
