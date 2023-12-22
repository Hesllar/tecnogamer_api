import { Request, Response } from "express";
import { CreateUserDto, CreateLogDto, CustomError, LoginDto } from "../../domain";
import { AuthService } from "../services";
import { HandleHttp } from "../../config";

export class AuthController {

    //DI
    constructor(
      private readonly authService:AuthService
    ){}

    private handleError = (error: any, res: Response, req:Request ) => {

      if ( error instanceof CustomError ) {
        return res.status(error.statusCode).json(
          HandleHttp.error({
            message:error.message,
            statusCode:error.statusCode,
            result:null,
            params:req.body,
            stack:CreateLogDto.create(JSON.parse(error.stack), req)
          }));
      }

      const statusCode = 500;

      return res.status(statusCode).json(
          HandleHttp.error({
            message:'Error no controlado',
            statusCode:statusCode,
            result:null,
            params:req.body,
            stack:CreateLogDto.create({
              username:'hesllar@gmail.com', 
              stack:{stack:error.stack, message:error.message},
              status_code:statusCode,
            }, req)
        }));
    } 


    public login = (req: Request, res: Response) =>{

        const [error, loginDto] = LoginDto.create(req.body);

        if(error){
          return res.status(400).json(
            HandleHttp.error({
              message:error,
              result:null,
              params:req.body,
              stack:CreateLogDto.create({ message: error, username:'hesllar@gmail.com'}, req)
              }));
        } 

        this.authService.login(loginDto!)
        .then( user =>{

          const message = 'Inicio sesión correcto';
          const statusCode = 200;

          return res.status(statusCode).json(HandleHttp.success({
            message:message,
            statusCode:statusCode,
            result:user,
            params:req.body,
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

    public createUser = (req: Request, res: Response) => {
  
      const [error, createUserDto] = CreateUserDto.create(req.body);

      if(error){
        return res.status(400).json(
          HandleHttp.error({
            message:error,
            result:null,
            params:req.body,
            stack:CreateLogDto.create({ message: error, username:'hesllar@gmail.com'}, req)
            }));
      } 

      this.authService.createUser(createUserDto!)
        .then(newUser =>{

          const message = 'Usuario creado correctamente';
          const statusCode = 201;

          return res.status(statusCode).json(HandleHttp.success({
            message:message,
            statusCode:statusCode,
            result:newUser,
            params:req.body,
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