import { EncryptionService } from "./services/encryption.service";
import { FirstSetupService } from "./services/firstSetup.service";
import { JWTService } from "./services/jwt.service";
import SqlConfigService from "./services/sqlConfig.service";

export default [
    SqlConfigService,
    JWTService,
    FirstSetupService,
    EncryptionService
]
