import { PostgresDatabase } from "../../postgres-database";


export class DeleteProductByIdCall {

    public static deleteProductByIdPG = async(id: number):Promise<boolean> => {

        try {
          
            const query = 'select * from delete_product_by_id(?)';
            await PostgresDatabase.instanceDB.query(query, {
                replacements:[id],
                type: PostgresDatabase.queryTypes.SELECT
            });
        
            return true;

        } catch (error) {
            throw error;
        }
    }

}