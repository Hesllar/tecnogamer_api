import { Request, Response } from "express";
import { CreateLogDto, CustomError, GetUserByEmailDto } from "../../domain";
import { UserService } from "../services";
import { HandleHttp } from "../../config";

export class UserController {

    //DI
    constructor(
      private readonly userService:UserService
    ){}

    private handleError = (error: any, res: Response, req:Request ) => {

      const params = { body:req.body, params:req.params, query:req.query };

      if ( error instanceof CustomError ) {
       
        return res.status(error.statusCode).json(
          HandleHttp.error({
            message:error.message,
            statusCode:error.statusCode,
            params,
            stack:CreateLogDto.create(JSON.parse(error.stack), req)
          }));
      }

      const statusCode = 500;

      return res.status(statusCode).json(
          HandleHttp.error({
            message:'Error no controlado',
            statusCode:statusCode,
            params,
            stack:CreateLogDto.create({
              stack:{stack:error.stack, message:error.message},
              status_code:statusCode,
            }, req)
        }));
    } 


  

    public getUsers = (req: Request, res: Response) => {
      
      this.userService.getUsers()
        .then(users =>{

          const message = 'Usuarios obtenidos correctamente';
          const statusCode = 200;

          return res.status(statusCode).json(HandleHttp.success({
            message:message,
            statusCode:statusCode,
            result:users,
            stack:CreateLogDto.create({
              message,
              is_error:false,
              status_code: statusCode, 
              code:1,
              level:'info'
            }, req)
          }));
        })
        .catch(error => this.handleError(error, res, req));

    }


    public getUserByEmail = (req: Request, res: Response) => {
      
      const [error, getUserByEmailDto] = GetUserByEmailDto.create(req.params);

      if(error){
        return res.status(400).json(
          HandleHttp.error({
            message:error,
            params:req.params,
            stack:CreateLogDto.create({ message: error}, req)
            }));
      } 
      
      this.userService.getUserByEmail(getUserByEmailDto?.email!)
        .then(users =>{
          const { password, ...resto} = users!;
          const message = 'Usuario obtenido correctamente';
          const statusCode = 200;

          return res.status(statusCode).json(HandleHttp.success({
            message:message,
            statusCode:statusCode,
            result:resto,
            params:req.params,
            stack:CreateLogDto.create({
              message,
              is_error:false,
              status_code: statusCode, 
              code:1,
              level:'info'
            }, req)
          }));
        })
        .catch(error => this.handleError(error, res, req));

    }

}