


export class CreateUserDto{

    private constructor(
        public email:               string,
        public readonly name:       string,
        public password:            string,
        public readonly description:string,
        public readonly roleUserId: number, 
    ){}


    public static create = (porps:{[key:string]:any}):[string?, CreateUserDto?] =>{

        const {
            email,
            name,
            password,
            description = '',
            roleUserId = 1
        } = porps;

        if(typeof email === 'undefined') return ['El correo es requerido'];

        if(typeof email !== 'string') return ['El correo debe ser una cadena de letras'];

        if(typeof name === 'undefined') return ['El nombre de usuario es requerido'];

        if(typeof name !== 'string') return ['El nombre de usuario debe ser una cadena de letras'];

        if(typeof password === 'undefined') return ['La contraseña es requerida'];

        if(typeof password !== 'string') return ['La contraseña debe ser una cadena de letras'];

        if(description){
            if(typeof description !== 'string') return ['La descripción debe ser una cadena de letras'];
        }

        if(typeof roleUserId !== 'number') return ['El rol del usuario debe ser un numero'];

        return [ undefined, new CreateUserDto(email, name, password, description, roleUserId)];
    }

}