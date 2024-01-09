import { Util } from "../../../../config";
import { CreateLogProps } from "../../../../domain";
import { PostgresDatabase } from "../../postgres-database";

export interface LogPG{
    id:                 number;
    code:               number;
    message:            string;
    method:             number;
    path:               string;
    status_code:        number;
    is_error:           boolean;
    request:            string;
    stack:              string;
    username:           string;
    headers:            string;
    level:              string;
    created_at:         string;
}


export class CreateLogCall {
    public static createLogPG = async(createLogProps:CreateLogProps):Promise<LogPG> => {

        const query = `select * from create_log(${Util.keyToString(createLogProps)})`

        return PostgresDatabase.instanceDB.query(query,{
            replacements: {...createLogProps},
            type: PostgresDatabase.queryTypes.SELECT
        })
        .then(([result])=>{
            return result as LogPG;
        })
        .catch(error => {throw error})
    }
}