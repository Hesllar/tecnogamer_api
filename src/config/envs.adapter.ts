import 'dotenv/config';
import * as env from 'env-var';


interface Envs {
    port:                   number;
    postgres_db_name:       string;
    postgres_db_user:       string;
    postgres_db_password:   string;
    postgres_db_port:       number;
}

export class EnvsAdapter {

    public static envs = ():Envs =>{
        return {
            port:env.get('PORT').required().asInt(),
            postgres_db_name: env.get('POSTGRES_DB_NAME').required().asString(),
            postgres_db_user: env.get('POSTGRES_DB_USER').required().asString(),
            postgres_db_password: env.get('POSTGRES_DB_PASSWORD').required().asString(),
            postgres_db_port: env.get('POSTGRES_DB_PORT').default(5432).asInt(),
        }

    }
}