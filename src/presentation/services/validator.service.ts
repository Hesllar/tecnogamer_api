
import { 
    ValidateBrandIdCall,
    ValidateCategoryIdCall,
    ValidateExistsProductNameUpdateCall,
    ValidateProductIdCall, 
    ValidateProductNameCall, 
    ValidateRolUserCall, 
    ValidateUserEmailCall, 
} from '../../data';
import { CustomError } from '../../domain';



export class ValidatorService {


    public static validateUserEmail = async (email:string) => {
        
        try {
            
            const existsUserEmail = await ValidateUserEmailCall.validateUserEmailPG(email);
            
            return existsUserEmail;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack, message:error.message}
            });
        }
    }

    public static validateRolUser = async (rolUser:number) => {
        
        try {
            
            const existsRolUser = ValidateRolUserCall.validateRolUserPG(rolUser);
            
            return existsRolUser;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack, message:error.message}
            });
        }
    }

    public static validateProductId = async (id:number) => {
        
        try {
            
            const existsProductId = await ValidateProductIdCall.validateProductIdPG(id);
            
            return existsProductId;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack, message:error.message}
            });
        }
    }

    public static validateBrandId = async (brandId:number) => {
        
        try {
            
            const existsBrandId = await ValidateBrandIdCall.validateBrandIdPG(brandId);
            
            return existsBrandId;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack, message:error.message}
            });
        }
    }

    public static validateCategoryId = async (categoryId:number) => {
        
        try {
            
            const existsCategoryId = await ValidateCategoryIdCall.validateCategoryIdPG(categoryId);
            
            return existsCategoryId;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack, message:error.message}
            });
        }
    }

    public static validateProductName = async (name:string) => {
        
        try {
            
            const existsProductName = await ValidateProductNameCall.validateProductNamePG(name);
            
            return existsProductName;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack, message:error.message}
            });
        }
    }

    public static validateProductNameUpdate = async (id:number, name:string) => {
        
        try {
            
            const existsProductNameUpdate = await ValidateExistsProductNameUpdateCall.validateProductNameUpdatePG(id, name);
            
            return existsProductNameUpdate;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack, message:error.message}
            });
        }
    }


}