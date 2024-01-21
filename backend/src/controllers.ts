import { RoleController } from "./controllers/role.controller";
import { SessionsController } from "./controllers/sessions.controller";
import { SQLController } from "./controllers/sql.controller";
import { UserController } from "./controllers/user.controller";

export default [
    SQLController,
    UserController,
    RoleController,
    SessionsController
]
