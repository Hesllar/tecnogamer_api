import { PostgresDatabase } from "../../postgres-database";


export class ValidateCategoryIdCall {

    public static validateCategoryIdPG = async(id:number):Promise<boolean> => {

        try {
            
            const query = 'select * from validate_exists_category_id(?)';
            const [result] = await PostgresDatabase.instanceDB.query(query, {
                replacements:[id],
                type: PostgresDatabase.queryTypes.SELECT
            });
            
            const { validate_exists_category_id } = result as {validate_exists_category_id:boolean}
            
            if(validate_exists_category_id) return true;

            return false;

        } catch (error) {
            throw error;
        }
    }
}