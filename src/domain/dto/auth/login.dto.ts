


export class LoginDto{

    private constructor(
        public email:       string,
        public password:    string,
    ){}


    public static create = (porps:{[key:string]:any}):[string?, LoginDto?] =>{

        const { email, password } = porps;

        if(typeof email === 'undefined') return ['El campo correo es requerido'];

        if(typeof email !== 'string') return ['El campo correo es debe ser una cadena de texto'];

        if(typeof password === 'undefined') return ['El campo contraseña es requerido'];

        if(typeof password !== 'string') return ['El campo contraseña es debe ser una cadena de texto'];

        return [ undefined, new LoginDto(email, password)];
    }

}