
import { ValidateUserEmailCall } from '../../data';
import { CustomError } from '../../domain';



export class ValidatorService {


    public static validateUserEmailPG = async (email:string) => {
        
        try {
            
            const existsUserEmail = await ValidateUserEmailCall.validateUserEmailPG(email)
            
            return existsUserEmail;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack, message:error.message}
            });
        }
    }


}