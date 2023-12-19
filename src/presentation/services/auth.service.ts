import { BycryptAdapter } from '../../config';
import { CreateUserCall, ValidateUserEmailCall, GetUserByEmailCall } from '../../data';
import { CreateUserDto, CustomError, LoginDto } from '../../domain';



export class AuthService {

    //DI
    constructor(){}

    public createUser = async (createUserDto:CreateUserDto) => {

        createUserDto.email = createUserDto.email.toLowerCase();

        const result = await ValidateUserEmailCall.validateUserEmailPG(createUserDto.email);

        if(result){

            const message = `El correo ${createUserDto.email} ya esta registrado`;

            throw CustomError.badRequest(message,  {message,username:'hesllar@gmail.com'});
        } 

        try {

            createUserDto.password = BycryptAdapter.hash(createUserDto.password);

            const newUser = await CreateUserCall.createUserPG(createUserDto);

            return newUser;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                username:'hesllar@gmail.com',
                stack:{stack:error.stack, message:error.message}
            });
        }
    }


    public login = async (loginDto:LoginDto) => {

        loginDto.email = loginDto.email.toLowerCase();

        const result = await ValidateUserEmailCall.validateUserEmailPG(loginDto.email);

        if(!result){

            const message = `El correo ${loginDto.email} no esta registrado`;

            throw CustomError.badRequest(message, {message, username:'hesllar@gmail.com'});
        } 

        const {password, ...resto} = await GetUserByEmailCall.getUserByEmailPG(loginDto.email);
       
        const compare = BycryptAdapter.compare(loginDto.password, password);
        
        if(!compare) {
            
            const message = `El correo o la contraseña no son correctos`;

            throw CustomError.badRequest(message, {message, username:'hesllar@gmail.com'});
        }
        
        return resto;
    }

}