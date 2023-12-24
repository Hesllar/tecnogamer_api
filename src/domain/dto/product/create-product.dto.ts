import { User } from "../../";



export class CreateProductDto{

    private constructor(
        public readonly name:           string,
        public readonly user:           User,
        public readonly description:    string,
        public readonly price:          number,
        public readonly stock:          number, 
        public readonly categoryId:     number, 
        public readonly brandId:        number, 
        public readonly imageUrl:       string,
        public status?:                 string,            
    ){}


    public static create = (porps:{[key:string]:any}):[string?, CreateProductDto?] =>{

        const {
            name,
            description = '',
            price,
            stock,
            categoryId,
            brandId,
            imageUrl = '',
            user
        } = porps;

        if(typeof name === 'undefined' || typeof name !== 'string') 
            return ['El nombre del producto es requerido, o su valor no es una cadena de texto'];

        if(description){
            if(typeof description !== 'string') return ['La descripción debe ser una cadena de texto'];
        }

        if(typeof price === 'undefined' || typeof price !== 'number') 
            return ['El precio del producto es requerido, o su valor no es numérico'];

        if(typeof stock === 'undefined' || typeof stock !== 'number') 
            return ['El stock del producto es requerido, o su valor no es numérico'];

        if(typeof categoryId === 'undefined' || typeof categoryId !== 'number') 
            return ['La categoría del producto es requerido, o su valor no es numérico'];

        if(typeof brandId === 'undefined' || typeof brandId !== 'number') 
            return ['La marca del producto es requerido, o su valor no es numérico'];

        if(imageUrl){
            if(typeof imageUrl !== 'string') return ['La imagen del producto debe ser una cadena de texto'];
        }

        return [ undefined, new CreateProductDto(
            name.trim(),
            user,
            description,
            price,
            stock,
            categoryId,
            brandId,
            imageUrl,
            )];
    }

}