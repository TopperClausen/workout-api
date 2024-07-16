import { BaseEntity as TypeOrmBaseEntity } from 'typeorm';

export class BaseEntity extends TypeOrmBaseEntity {
  grantParams(params: object) {
    Object.keys(params).forEach((key) => {
      if (params[key]) this[key] = params[key];
    });
  }
}
