import { PostgresDatabase } from "../../postgres-database";

export interface Log{
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
    public static createLogPG = async(object:{[key:string]:any}):Promise<Log> => {

        try {
            const {
                code,
                message,
                method,
                path,
                status_code,
                is_error,
                request,
                stack,
                username,
                headers,
                level,
            } = object;
            
            const query = 'select * from create_log(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
            const [result] = await PostgresDatabase.instanceDB.query(query, {
                replacements:[
                    code,
                    message,
                    method,
                    path,
                    status_code,
                    is_error,
                    request,
                    stack,
                    username,
                    headers,
                    level,
                ],
                type: PostgresDatabase.queryTypes.SELECT
            });
            
            return result as Log;

        } catch (error) {
            throw error;
        }
    }
}