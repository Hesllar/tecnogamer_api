import { Request } from "express"

export interface CreateLogProps {
    code?:              number,
    message?:            string,
    method?:            string,
    path?:              string,
    status_code?:        number, 
    is_error?:          boolean, 
    request?:           string, 
    stack?:             unknown, 
    username:           string, 
    headers?:           string, 
    level?:              string, 
}


export class CreateLogDto{

    private constructor(
        public readonly createLogProps:CreateLogProps
    ){}


    public static create = (props:{[key:string] :any}, req:Request):CreateLogProps => {
        
        const { 
            code = -1, 
            is_error = true, 
            status_code = 400,
            message = 'Error no controlado',
            level = 'error',
            stack = null, 
        } = props;



        const createLogDto ={
            code,
            message,
            method: req.method,
            path: req.originalUrl,
            status_code,
            is_error,
            request:JSON.stringify(req.body),
            stack:JSON.stringify(stack),
            username:props.username,
            headers: JSON.stringify(req.headers),
            level
        }
 
        return new CreateLogDto(createLogDto).createLogProps;
    }

}