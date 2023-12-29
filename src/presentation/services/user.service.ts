
import { GetUserByEmailCall, GetUsersCall } from '../../data';
import { CustomError } from '../../domain';
import { ValidatorService } from './';



export class UserService {

    //DI
    constructor(){}

    public getUsers = async () => {

        try {

            const getUsers = await GetUsersCall.getUsersPG();

            return getUsers;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack, message:error.message}
            });
        }
    }

    public getUserByEmail = async (email:string) => {
        
        const result = await ValidatorService.validateUserEmail(email);

        if(!result) throw CustomError.badRequest(`El correo ${email} no esta registrado`);

        try {
            
            const userByEmail = await GetUserByEmailCall.getUserByEmailPG(email);
            
            return userByEmail;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack, message: error.message}
            });
        }
    }


}