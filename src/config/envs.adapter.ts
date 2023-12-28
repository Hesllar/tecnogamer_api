import { Util } from './utils';
import dotenv from 'dotenv';
import * as env from 'env-var';

dotenv.config({path:`./.env.${Util.setNodeEnv()}`});

export class EnvsAdapter {
    
    public static env: string =         env.get('ENV').required().asString();
    public static port: number =        env.get('PORT').required().asInt();
    public static db_name: string =     env.get('DB_NAME').required().asString();
    public static db_user: string =     env.get('DB_USER').required().asString();
    public static db_password: string = env.get('DB_PASSWORD').required().asString();
    public static db_port: number =     env.get('DB_PORT').required().asInt();
    public static seed: string =        env.get('SEED').required().asString();

}