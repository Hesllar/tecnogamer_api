import { CreateLogCall } from "../data";
import { CreateLogProps } from "../domain";

export interface HttpOptions {
    message:        string;
    params:         any;
    result:         any;
    stack:          CreateLogProps,
    code?:          number;
    error?:         boolean;
    statusCode?:    number;


}



export class HandleHttp {

    private constructor(
        private readonly stack:CreateLogProps,
    ){

        CreateLogCall.createLogPG(stack)
    }

    public static success = (httpOptions:HttpOptions) =>{
        const {
            code = 1,
            error = false,
            message,
            params,
            result,
            statusCode = 200,
        } = httpOptions;

        new HandleHttp(httpOptions.stack);

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
            params,
            result,
            statusCode = 400,
        } = httpOptions;

        new HandleHttp(httpOptions.stack);

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