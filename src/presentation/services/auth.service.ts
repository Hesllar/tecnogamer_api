import { BycryptAdapter, JwtAdapter } from '../../config';
import { 
        CreateUserCall, 
        GetUserByEmailCall, 
        ValidateRolUserCall, 
        ValidateUserEmailCall,
} from '../../data';
import { CreateUserDto, CustomError, LoginDto } from '../../domain';



export class AuthService {

    //DI
    constructor(){}

    public createUser = async (createUserDto:CreateUserDto) => {

        createUserDto.email = createUserDto.email.toLowerCase();

        const [existEmail, existRol] = await Promise.all([
            ValidateUserEmailCall.validateUserEmailPG(createUserDto.email),
            ValidateRolUserCall.validateRolUserPG(createUserDto.roleUserId),
        ]);

        if(existEmail) throw CustomError.badRequest( `El correo ${createUserDto.email} ya esta registrado`);
        

        if(!existRol) throw CustomError.badRequest(`El rol ${createUserDto.roleUserId} no esta registrado`);
        

        try {

            createUserDto.password = BycryptAdapter.hash(createUserDto.password);

            const newUser = await CreateUserCall.createUserPG(createUserDto);

            return newUser;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack}
            });
        }
    }


    public login = async (loginDto:LoginDto) => {

        loginDto.email = loginDto.email.toLowerCase();

        const result = await ValidateUserEmailCall.validateUserEmailPG(loginDto.email);

        if(!result) throw CustomError.badRequest(`El correo ${loginDto.email} no esta registrado`);
        
        const {password, ...resto} = await GetUserByEmailCall.getUserByEmailPG(loginDto.email);
       
        const compare = BycryptAdapter.compare(loginDto.password, password);
        
        if(!compare)  throw CustomError.badRequest('El correo o la contraseña no son correctos');
        
        const token = await JwtAdapter.generateToken({username:resto.email, id:resto.id});

        if(!token) throw CustomError.iternalServer('Error al momento de generar el token');
        
        return {...resto, token};
    }

}