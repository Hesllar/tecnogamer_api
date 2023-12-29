


export class GetUserByEmailDto{

    private constructor(
        public email: string
    ){}


    public static create = (porps:{[key:string]:any}):[string?, GetUserByEmailDto?] =>{
        
        const { email } = porps;

        if(typeof email === 'undefined' || !isNaN(email)) 
            return ['El parámetro correo es requerido, o su valor no es una cadena de texto'];

        return [ undefined, new GetUserByEmailDto(email.trim())];
    }

}