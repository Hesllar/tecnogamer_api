import { PostgresDatabase } from "../../postgres-database";

export interface GetUserByEmailPG {
    id:             number,
    email:          string,
    name:           string,
    password:       string,
    description:    string,
    role_user_id:   number,
    created_at:     string,
    updated_at:     string,
}




export class GetUserByEmailCall {

    public static getUserByEmailPG = async(email:string):Promise<GetUserByEmailPG> => {

        try {
            
            const query = 'select * from get_user_by_email(?)';
            const [result] = await PostgresDatabase.instanceDB.query(query, {
                replacements:[email],
                type: PostgresDatabase.queryTypes.SELECT
            });
            

            return result as GetUserByEmailPG;

        } catch (error) {
            throw error;
        }
    }
}
