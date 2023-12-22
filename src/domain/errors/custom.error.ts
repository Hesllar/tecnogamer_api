



export class CustomError extends Error {

    private constructor(
        public readonly statusCode:number,
        public readonly message:string,
        public readonly stack:string,
    ){
        super(JSON.stringify({message, stack}));
    }

    public static badRequest = (message:string,stack:any) => {
        return new CustomError(400, message, JSON.stringify(stack));
    }

    public static unauthorized = (message:string, stack:any) =>{
        return new CustomError(401, message, JSON.stringify(stack));
    }

    public static forbidden = (message:string, stack:any) => {
        return new CustomError(403, message, JSON.stringify(stack));
    }

    public static notFound = (message:string, stack:any) => {
        return new CustomError(404, message, JSON.stringify(stack));
    }

    public static iternalServer = (message:string, stack:any) => {
        return new CustomError(500, message, JSON.stringify(stack));
    }
}