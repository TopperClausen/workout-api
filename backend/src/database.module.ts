import { Role } from './entities/role.entity';
import { User } from './entities/user.entity';
import SqlConfigService from './services/sqlConfig.service';
import { TypeOrmModule } from '@nestjs/typeorm';

export const appendTypeOrmModule = (array) => {
    const sqlConfigService = new SqlConfigService();
    if(sqlConfigService.isConfigured) {
        array.push(TypeOrmModule.forRoot({
            ...sqlConfigService.config,
            entities: [User, Role],
            synchronize: true
        }))
    }
}