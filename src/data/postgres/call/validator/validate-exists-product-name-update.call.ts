import { PostgresDatabase } from "../../postgres-database";


export class ValidateExistsProductNameUpdateCall {

    public static validateProductNameUpdatePG = async(id:number, name:string):Promise<boolean> => {

        try {
            
            const query = 'select * from validate_exists_product_name_update(?, ?)';
            const [result] = await PostgresDatabase.instanceDB.query(query, {
                replacements:[id, name],
                type: PostgresDatabase.queryTypes.SELECT
            });
            
            const { validate_exists_product_name_update } = result as {validate_exists_product_name_update:boolean}
            
            if(validate_exists_product_name_update) return true;

            return false;

        } catch (error) {
            throw error;
        }
    }
}