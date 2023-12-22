import { PostgresDatabase } from "../../postgres-database";


export class ValidateRolUserCall {

    public static validateRolUserPG = async(rolUser:number):Promise<boolean> => {

        try {
            
            const query = 'select * from validate_exists_rol_user(?)';
            const [result] = await PostgresDatabase.instanceDB.query(query, {
                replacements:[rolUser],
                type: PostgresDatabase.queryTypes.SELECT
            });
            
            const { validate_exists_rol_user } = result as {validate_exists_rol_user:boolean}
            
            if(validate_exists_rol_user) return true;

            return false;

        } catch (error) {
            throw error;
        }
    }
}