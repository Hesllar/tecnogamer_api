


export class GetUserByEmailDto{

    private constructor(
        public email: string
    ){}


    public static create = (porps:{[key:string]:any}):[string?, GetUserByEmailDto?] =>{

        const { email } = porps;

        if(typeof email === 'undefined') return ['El parámetro correo es requerido'];

        return [ undefined, new GetUserByEmailDto(email)];
    }

}