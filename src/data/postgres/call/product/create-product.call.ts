import { CreateProductDto, ProductPG } from "../../../../domain";
import { PostgresDatabase } from "../../postgres-database";
import { Util } from "../../../../config";


export class CreateProductCall {

    public static createProductPG = async(createProductDto:CreateProductDto):Promise<ProductPG> => {

        try {
          
            const query = `select * from create_product(${Util.keyToString(createProductDto)})`
            const [result] = await PostgresDatabase.instanceDB.query(query, {
                replacements:{...createProductDto},
                type: PostgresDatabase.queryTypes.SELECT
            });


            return result as ProductPG;

        } catch (error) {
            throw error;
        }
    }

}