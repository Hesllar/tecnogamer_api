import 'dotenv/config';
import * as env from 'env-var';


interface Envs {
    port:number;
}

export class EnvsAdapter {

    public static envs = ():Envs =>{
        return {
            port:env.get('PORT').required().asInt()
        }

    }
}