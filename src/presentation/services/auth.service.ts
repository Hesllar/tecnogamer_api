import { CreateUserCall, ValidateUserEmail } from '../../data';
import { CreateUserDto, CustomError } from '../../domain';



export class AuthService {

    //DI
    constructor(){}

    public createUser = async (createUserDto:CreateUserDto) => {

        createUserDto.email = createUserDto.email.toLowerCase();

        const result = await ValidateUserEmail.validate(createUserDto.email);

        if(result) throw CustomError.badRequest(
            `El email ${createUserDto.email} ya esta registrado`, 
            {
                message:`El email ${createUserDto.email} ya esta registrado`,
                username:'hesllar@gmail.com'
            }
        );

        try {

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

}