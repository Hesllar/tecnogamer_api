import {  
    CreateProductCall,
    ValidateBrandIdCall,
    ValidateCategoryIdCall,
    ValidateProductNameCall 
} from '../../data';
import { CustomError, CreateProductDto } from '../../domain';



export class ProductService {

    //DI
    constructor(){}

    public createProduct = async (createProductDto:CreateProductDto) => {

        const [ existsBrandId, existsCategoryId, existsProductName] = await Promise.all([
            ValidateBrandIdCall.validateBrandIdPG(createProductDto.brandId),
            ValidateCategoryIdCall.validateCategoryIdPG(createProductDto.categoryId),
            ValidateProductNameCall.validateProductNamePG(createProductDto.name)
        ]);

        if(!existsBrandId){

            const message = 'La marca enviada no esta registrada';

            throw CustomError.badRequest(message,  {message});
        }

        if(!existsCategoryId){
            
            const message = 'La categoría enviada no esta registrada';

            throw CustomError.badRequest(message,  {message});
        }

        if(existsProductName){
            
            const message = `El producto ${createProductDto.name} ya esta registrado`;

            throw CustomError.badRequest(message,  {message});
        }
        
        try {

            const newProduct = await CreateProductCall.createProductPG({...createProductDto, status:'in_stock'});

            return newProduct;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack, message:error.message}
            });
        }
    }

}