import {  
    CreateProductCall,
    DeleteProductByIdCall,
    GetProductByIdCall, 
    GetProductsCall,
    UpdateProductByIdCall
} from '../../data';
import { CustomError, CreateProductDto, UpdateProductByIdDto } from '../../domain';
import { ValidatorService } from './';


export class ProductService {

    //DI
    constructor(){}

    public getProducts = async () => {

        try {

            const products = await GetProductsCall.getProductsPG();

            return products;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack}
            });
        }
    }


    public getProductById = async (id: number) => {

        const existsProductId = await ValidatorService.validateProductId(id);

        if(!existsProductId) throw CustomError.badRequest('El producto enviado no esta registrado');
        
        try {

            const productById = await GetProductByIdCall.getProductByIdPG(id);

            return productById;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack, message:error.message}
            });
        }
    }


    public createProduct = async (createProductDto:CreateProductDto) => {

        const [ existsBrandId, existsCategoryId, existsProductName] = await Promise.all([
            ValidatorService.validateBrandId(createProductDto.brandId),
            ValidatorService.validateCategoryId(createProductDto.categoryId),
            ValidatorService.validateProductName(createProductDto.name)
        ]);

        if(!existsBrandId) throw CustomError.badRequest('La marca enviada no esta registrada');
        

        if(!existsCategoryId) throw CustomError.badRequest('La categoría enviada no esta registrada');
        

        if(existsProductName) throw CustomError.badRequest(`El producto ${createProductDto.name} ya esta registrado`);
        
        try {

            const newProduct = await CreateProductCall.createProductPG(createProductDto);

            return newProduct;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack, message:error.message}
            });
        }
    }

    public updateProductById = async (updateProductByIdDto:UpdateProductByIdDto) => {

        const { id, brandId, categoryId, name } = updateProductByIdDto;

        const [ existsProductId, existsBrandId, existsCategoryId, existsProductName] = await Promise.all([
            ValidatorService.validateProductId(id),
            ValidatorService.validateBrandId(brandId),
            ValidatorService.validateCategoryId(categoryId),
            ValidatorService.validateProductNameUpdate(id, name),
        ]);

        if(!existsProductId) throw CustomError.badRequest('El id del producto enviado no esta registrado');
       

        if(!existsBrandId) throw CustomError.badRequest('La marca enviada no esta registrada');
        

        if(!existsCategoryId) throw CustomError.badRequest('La categoría enviada no esta registrada');
        

        if(existsProductName) throw CustomError.badRequest('El nombre de producto enviado ya pertenece a otro producto');
        
        try {

            const updateProduct = await UpdateProductByIdCall.updateProductByIdPG(updateProductByIdDto);

            return updateProduct;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack, message:error.message}
            });
        }

    }

    public deleteProductById = async (id: number) => {

        const existsProductId = await ValidatorService.validateProductId(id);
     
        if(!existsProductId) throw CustomError.badRequest('El id del producto enviado no esta registrado');
        
        try {

            await DeleteProductByIdCall.deleteProductByIdPG(id);

            return { hasDelete: true };

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack, message:error.message}
            });
        }

    }
    
}