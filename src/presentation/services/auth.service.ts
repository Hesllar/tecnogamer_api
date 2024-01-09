import { BycryptAdapter, HandleErrorDB, JwtAdapter } from '../../config';
import { CreateUserCall } from '../../data';
import { CreateUserDto, CustomError, LoginDto } from '../../domain';
import { UserService } from './';



export class AuthService {

    //DI
    constructor(
        private readonly userService:UserService
    ){}

    public createUser = async (createUserDto:CreateUserDto) => {
        
        try {

            createUserDto.password = BycryptAdapter.hash(createUserDto.password);

            const newUser = await CreateUserCall.createUserPG(createUserDto);

            return newUser;

        } catch (error) {
            if(error instanceof Error) throw HandleErrorDB.validate(error);
        }
    }


    public login = async (loginDto:LoginDto) => {
        
        
        const userByEmail = await this.userService.getUserByEmail(loginDto.email); 
       
        const {password, ...resto} = userByEmail!;

        const compare = BycryptAdapter.compare(loginDto.password, password);
        
        if(!compare)  throw CustomError.badRequest('El correo o la contraseña no son correctos');
        
        const token = await JwtAdapter.generateToken({email:resto.email, id:resto.id});

        if(!token) throw CustomError.iternalServer('Error al momento de generar el token');
        
        return {...resto, token};
    }

}