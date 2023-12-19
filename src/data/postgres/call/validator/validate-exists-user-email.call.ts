import { PostgresDatabase } from "../../postgres-database";


export class ValidateUserEmailCall {

    public static validateUserEmailPG = async(email:string):Promise<boolean> => {

        try {
            
            const query = 'select * from validate_exists_user_email(?)';
            const [result] = await PostgresDatabase.instanceDB.query(query, {
                replacements:[email],
                type: PostgresDatabase.queryTypes.SELECT
            });
            
            const { validate_exists_user_email } = result as {validate_exists_user_email:boolean}
            
            if(validate_exists_user_email) return true;

            return false;

        } catch (error) {
            throw error;
        }
    }
}