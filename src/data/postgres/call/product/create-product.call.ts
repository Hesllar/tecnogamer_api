import { CreateUserDto } from "../../../../domain";
import { PostgresDatabase } from "../../postgres-database";

export enum StatusProduct {
    'in_stock',
    'out_of_stock',
    'running_low',
}

export interface Product{
    id:             number;
    name:           string;
    description:    string;
    price:          number;
    status:         StatusProduct;
    stock:          number;
    category_id:    number;
    brand_id:       number;
    image_url:      string;
}

export class CreateProductCall {

    public static createProductPG = async(createProductDto:any):Promise<Product> => {

        try {
            const {
                name,
                description,
                price,
                stock,
                categoryId,
                brandId,
                imageUrl,
                status
             
            } = createProductDto;
    
            const query = 'select * from create_product(?, ?, ?, ?, ?, ?, ?, ?)'
            const [result] = await PostgresDatabase.instanceDB.query(query, {
                replacements:[name , description, price, status, stock, categoryId, brandId, imageUrl],
                type: PostgresDatabase.queryTypes.SELECT
            });


            return result as Product;

        } catch (error) {
            throw error;
        }
    }

}