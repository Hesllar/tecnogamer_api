import { PostgresDatabase } from "../../postgres-database";
import { ProductPG } from '../../../../domain';

export class GetProductByIdCall {

    public static getProductByIdPG = async(id: number):Promise<ProductPG> => {

        try {
          
            const query = 'select * from get_product_by_id(?)';
            const [result] = await PostgresDatabase.instanceDB.query(query, {
                replacements:[id],
                type: PostgresDatabase.queryTypes.SELECT
            });
           
            return result as ProductPG;

        } catch (error) {
            throw error;
        }
    }

}