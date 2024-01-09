import { Request, Response, NextFunction  } from 'express';
import { CreateLogDto, CustomError } from '../../domain';
import { HandleResponseHttp, HttpOptions } from '../../config';


export class HandleHttp {

    public static handle = (data: HttpOptions | Error, req:Request, res:Response, next:NextFunction) => {

      const params = { body:req.body, params:req.params, query:req.query };

        if(data instanceof Error){
            
            if ( data instanceof CustomError ) {
                return res.status(data.statusCode).json(
                  HandleResponseHttp.error({
                    message:data.message,
                    statusCode:data.statusCode,
                    params,
                    stack:CreateLogDto.create(JSON.parse(data.stack), req)
                  }));
              }
    
              const statusCode = 500;
        
              return res.status(statusCode).json(
                HandleResponseHttp.error({
                    message:'Error no controlado',
                    statusCode:statusCode,
                    params,
                    stack:CreateLogDto.create({
                      stack:{stack:data.stack, message:data.message},
                      statusCode,
                    }, req)
                }));
        }
       
        return res.status(data.statusCode!).json(HandleResponseHttp.success({
          message:data.message!,
          params,
          result:data.result!,
          statusCode:data.statusCode!
        }))
    }


}