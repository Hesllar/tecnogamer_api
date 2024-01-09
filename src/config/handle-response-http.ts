import { CreateLogProps } from "../domain";
import { LogService } from "../presentation";

export interface HttpOptions {
    message:        string;
    params?:        any;
    result?:        any;
    stack?:         CreateLogProps,
    code?:          number;
    error?:         boolean;
    statusCode?:    number;


}



export class HandleResponseHttp {

    private constructor(
        private readonly stack:CreateLogProps,
    ){
        if(stack) LogService.createLog(stack).catch(error => console.log(error));
        
    }

    public static success = (httpOptions:HttpOptions) =>{
        
        const {
            code = 1,
            error = false,
            message,
            params= null,
            result = null,
            statusCode = 200,
        } = httpOptions;

        new HandleResponseHttp(httpOptions.stack!);
       
        if(params) delete params.user;

        return {
            message,
            statusCode,
            code, 
            error, 
            result,
            request:params,
        };
    }

    public static error = (httpOptions:HttpOptions) =>{
        const {
            code = -1,
            error = true,
            message,
            params = null,
            result = null,
            statusCode = 400,
        } = httpOptions;

        new HandleResponseHttp(httpOptions.stack!);

        if(params) delete params.user;

        return {
            message,
            statusCode,
            code, 
            error, 
            result,
            request:params,
        };
    }
    

}