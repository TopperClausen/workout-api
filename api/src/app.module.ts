import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './entities';
import * as dotenv from 'dotenv';
import { UserController } from './controllers/user.controller';
import { SessionsController } from './controllers/sessions.controller';
import { EncryptionService } from './services/encryption.service';
import { FoodfactsService } from './services/foodfacts.service';
import { NutritionController } from './controllers/nutrition.controller';

dotenv.config();

const { DB_USER, DB_NAME, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: DB_HOST,
      port: +DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: entities,
      synchronize: true,
    }),
  ],
  controllers: [UserController, SessionsController, NutritionController],
  providers: [EncryptionService, FoodfactsService],
})
export class AppModule {}
