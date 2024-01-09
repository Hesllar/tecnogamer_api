import { HandleErrorDB } from '../../config';
import {  
    CreateProductCall,
    DeleteProductByIdCall,
    GetProductByIdCall, 
    GetProductsCall,
    UpdateProductByIdCall
} from '../../data';
import { CreateProductDto, UpdateProductByIdDto } from '../../domain';



export class ProductService {

    //DI
    constructor(){}

    public getProducts = async () => {

        try {

            const products = await GetProductsCall.getProductsPG();

            return products;

        } catch (error) {
            if(error instanceof Error) throw HandleErrorDB.validate(error);
        }
    }


    public getProductById = async (id: number) => {

        try {

            const productById = await GetProductByIdCall.getProductByIdPG(id);

            return productById;

        } catch (error) {
            if(error instanceof Error) throw HandleErrorDB.validate(error);
        }
    }


    public createProduct = async (createProductDto:CreateProductDto) => {

        try {

            const newProduct = await CreateProductCall.createProductPG(createProductDto);

            return newProduct;

        } catch (error) {
            
            if(error instanceof Error) throw HandleErrorDB.validate(error);
            
        }
    }

    public updateProductById = async (updateProductByIdDto:UpdateProductByIdDto) => {

        try {

            const updateProduct = await UpdateProductByIdCall.updateProductByIdPG(updateProductByIdDto);

            return updateProduct;

        } catch (error) {
            if(error instanceof Error) throw HandleErrorDB.validate(error);
        }

    }

    public deleteProductById = async (id: number) => {

        try {

            await DeleteProductByIdCall.deleteProductByIdPG(id);

            return { hasDelete: true };

        } catch (error) {
            
            if(error instanceof Error) throw HandleErrorDB.validate(error);
        }

    }
    
}