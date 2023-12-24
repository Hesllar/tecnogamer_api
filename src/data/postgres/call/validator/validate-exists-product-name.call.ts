import { PostgresDatabase } from "../../postgres-database";


export class ValidateProductNameCall {

    public static validateProductNamePG = async(name:string):Promise<boolean> => {

        try {
            
            const query = 'select * from validate_exists_product_name(?)';
            const [result] = await PostgresDatabase.instanceDB.query(query, {
                replacements:[name],
                type: PostgresDatabase.queryTypes.SELECT
            });
            
            const { validate_exists_product_name } = result as {validate_exists_product_name:boolean}
            
            if(validate_exists_product_name) return true;

            return false;

        } catch (error) {
            throw error;
        }
    }
}