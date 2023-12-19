import 'dotenv/config';
import * as env from 'env-var';

const node_env = process.env.NODE_ENV?.trim() ?? 'DEV';

interface Envs {
    env:                    string;
    port:                   number;
    postgres_db_name:       string;
    postgres_db_user:       string;
    postgres_db_password:   string;
    postgres_db_port:       number;
}

export class EnvsAdapter {

    public static envs = ():Envs =>{
        return {
            env:env.get(`${node_env}_ENV`).default('dev').asString(),
            port:env.get(`${node_env}_PORT`).required().asInt(),
            postgres_db_name: env.get(`${node_env}_POSTGRES_DB_NAME`).required().asString(),
            postgres_db_user: env.get(`${node_env}_POSTGRES_DB_USER`).required().asString(),
            postgres_db_password: env.get(`${node_env}_POSTGRES_DB_PASSWORD`).required().asString(),
            postgres_db_port: env.get(`${node_env}_POSTGRES_DB_PORT`).default(5432).asInt(),
        }

    }
}