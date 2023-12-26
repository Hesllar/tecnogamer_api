import { ProductStatus, User } from "../../";

const optionsStatus = ['en_stock', 'sin_stock', 'poco_stock'];

export class CreateProductDto{

    private constructor(
        public readonly name:           string,
        public readonly description:    string,
        public readonly price:          number,
        public readonly status:         string, 
        public readonly stock:          number, 
        public readonly categoryId:     number, 
        public readonly brandId:        number, 
        public readonly imageUrl:       string,
                   
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
            user,
            status,
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

        if(typeof status === 'undefined' || typeof status !== 'string') 
            return ['El estado del producto es requerido, o su valor no es una cadena de texto'];

        if(!optionsStatus.includes(status))
            return [`Las opciones para el estado del producto son: ${optionsStatus}`];

        return [ undefined, new CreateProductDto(
            name.trim(),
            description,
            price,
            status,
            stock,
            categoryId,
            brandId,
            imageUrl,
            )];
    }

}