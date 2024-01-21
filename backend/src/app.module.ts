import { Module } from '@nestjs/common';
import SqlConfigService from './services/sqlConfig.service';
import { appendTypeOrmModule } from './database.module';
import { JWTService } from './services/jwt.service';
import { FirstSetupService } from './services/firstSetup.service';
import controllers from './controllers';
import services from './services';

const imports = [];
appendTypeOrmModule(imports);

@Module({
  imports,
  controllers: [...controllers],
  providers: [...services],
})
export class AppModule {}
