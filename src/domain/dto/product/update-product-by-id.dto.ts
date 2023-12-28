
const optionsStatus = ['en_stock', 'sin_stock', 'poco_stock'];


export class UpdateProductByIdDto {
    private constructor(
        public readonly id:             number,
        public readonly name:           string,
        public readonly description:    string,
        public readonly price:          number,
        public readonly status:         string, 
        public readonly stock:          number, 
        public readonly categoryId:     number, 
        public readonly brandId:        number, 
        public readonly imageUrl:       string,
    ){}

    
    public static update = (props: {[key:string]: any}):[string?, UpdateProductByIdDto?] => {
        const {
            id,
            name,
            description,
            price,
            stock,
            categoryId,
            brandId,
            imageUrl,
            status,
        } = props;

        if(isNaN(id))
            return ['El parámetro id debe ser un valor numérico'];

        if(typeof name === 'undefined' || typeof name !== 'string') 
            return ['El nombre del producto es requerido, o su valor no es una cadena de texto'];

        
        if(typeof description === 'undefined' || typeof description !== 'string') 
            return ['La descripción debe ser una cadena de texto, o su valor no es una cadena de texto'];
        
        if(typeof price === 'undefined' || typeof price !== 'number') 
            return ['El precio del producto es requerido, o su valor no es numérico'];

        if(price < 0)
            return ['El valor del precio debe ser mayor o igual a 0'];

        if(typeof stock === 'undefined' || typeof stock !== 'number') 
            return ['El stock del producto es requerido, o su valor no es numérico'];
        
        if(stock < 0)
            return ['El valor del stock debe ser mayor o igual a 0'];

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

            return [ undefined, new UpdateProductByIdDto(
                id,
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