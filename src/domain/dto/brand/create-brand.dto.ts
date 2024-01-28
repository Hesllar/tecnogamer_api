


export class CreateBrandDto{

    private constructor(
        public readonly name:        string,
        public readonly description: string,
    ){}


    public static create = (porps:{[key:string]:any}):[string?, CreateBrandDto?] =>{

        const { name, description } = porps;

        if(typeof name === 'undefined') return ['El nombre de la marca es requerido'];

        if(typeof name !== 'string') return ['El nombre de la marca debe ser una cadena de texto'];

        if(typeof description === 'undefined' || typeof description !== 'string')
             return ['La descripción es requerida, o su valor no es una cadena de texto'];
        
        return [ undefined, new CreateBrandDto(name.trim(), description)];
    }

}
