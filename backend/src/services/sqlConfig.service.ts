import * as path from "path";

const fs = require('node:fs');

interface SqlConfig {
    type: "mysql" | "mariadb",
    username: string,
    password: string,
    database: string,
    host: string,
    port: number
}

export default class SqlConfigService {
    private path = path.resolve(__dirname, '../../connection.json');
    public config: SqlConfig

    constructor() {
        const rawdata = fs.readFileSync(this.path);
        this.config = JSON.parse(rawdata);
    }

    get isConfigured() {
        return this.config.database != null &&
            this.config.username != null &&
            this.config.database != null &&
            this.config.type != null &&
            this.config.host != null &&
            this.config.port != null
    }
    
    setType(type: "mysql" | "mariadb") {
        this.config.type = type;
        return this;
    }

    setUsername(username: string) {
        this.config.username = username;
        return this;
    }

    setPassword(password: string) {
        this.config.password = password;
        return this;
    }

    setDatabase(database: string) {
        this.config.database = database;
        return this;
    }

    setHost(host: string) {
        this.config.host = host;
        return this;
    }

    setPort(port: number) {
        this.config.port = port;
        return this;
    }

    save() {
        const jsonString = JSON.stringify(this.config);
        if(fs.existsSync(this.path)) {
            fs.unlinkSync(this.path);
        }
        fs.writeFileSync(this.path, jsonString, 'utf8');
    }
}
