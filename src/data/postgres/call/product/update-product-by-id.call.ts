import { UpdateProductByIdDto, ProductPG } from "../../../../domain";
import { PostgresDatabase } from "../../postgres-database";
import { Util } from "../../../../config";


export class UpdateProductByIdCall {

    public static updateProductByIdPG = async(updateProductByIdDto:UpdateProductByIdDto):Promise<ProductPG> => {

        try {
          
            const query = `select * from update_product_by_id(${Util.keyToString(updateProductByIdDto)})`
            const [result] = await PostgresDatabase.instanceDB.query(query, {
                replacements:{...updateProductByIdDto},
                type: PostgresDatabase.queryTypes.SELECT
            });


            return result as ProductPG;

        } catch (error) {
            throw error;
        }
    }

}