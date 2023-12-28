import { PostgresDatabase } from "../../postgres-database";
import { ProductPG } from '../../../../domain';

export class GetProductsCall {

    public static getProductsPG = async():Promise<ProductPG[]> => {

        try {
          
            const query = 'select * from get_products()';
            const result = await PostgresDatabase.instanceDB.query(query, {
                type: PostgresDatabase.queryTypes.SELECT
            });

            return result as ProductPG[];

        } catch (error) {
            throw error;
        }
    }

}