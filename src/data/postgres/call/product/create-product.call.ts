import { CreateProductDto, ProductStatus } from "../../../../domain";
import { PostgresDatabase } from "../../postgres-database";
import { Util } from "../../../../config";


export interface ProductPG{
    id:             number;
    name:           string;
    description:    string;
    price:          number;
    status:         ProductStatus;
    stock:          number;
    category_id:    number;
    brand_id:       number;
    image_url:      string;
}

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