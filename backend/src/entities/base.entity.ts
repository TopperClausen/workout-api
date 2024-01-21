import { BaseEntity } from "typeorm";

export class CMSBaseEntity extends BaseEntity {
    grantParams(params: object) {
        Object.keys(params).forEach(key => {
            if(params[key]) this[key] = params[key]
        })
    }
}