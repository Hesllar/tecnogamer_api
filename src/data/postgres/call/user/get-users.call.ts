import { PostgresDatabase } from "../../postgres-database";

export interface GetUsersEmailPG {
    id:             number,
    email:          string,
    name:           string,
    description:    string,
    role_user_id:   number,
    created_at:     string,
    updated_at:     string,
}




export class GetUsersCall {

    public static getUsersPG = async():Promise<GetUsersEmailPG[]> => {

        try {
            
            const query = 'select * from get_users()';
            const result = await PostgresDatabase.instanceDB.query(query, {
                type: PostgresDatabase.queryTypes.SELECT
            });
            
            return result as GetUsersEmailPG[];

        } catch (error) {
            throw error;
        }
    }
}
