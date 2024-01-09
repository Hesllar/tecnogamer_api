import { NextFunction, Request, Response } from "express";
import { CreateUserDto, CustomError, LoginDto } from "../../domain";
import { AuthService } from "../services";


export class AuthController {

    //DI
    constructor(
      private readonly authService:AuthService
    ){}

    public login = (req: Request, res: Response, next:NextFunction) => {

        const [error, loginDto] = LoginDto.create(req.body);

        if(error) return next(CustomError.badRequest(error));
        
        this.authService.login(loginDto!)
        .then( user => {

          const message = 'Inicio sesión correcto';
          const statusCode = 200;

          next({
            message:message,
            statusCode:statusCode,
            result:user
          });
        })
        .catch(error => next(error));

    }

    public createUser = (req: Request, res: Response, next:NextFunction) => {
  
      const [error, createUserDto] = CreateUserDto.create(req.body);

      if(error) return next(CustomError.badRequest(error));
      

      this.authService.createUser(createUserDto!)
        .then(newUser =>{

          const message = 'Usuario creado correctamente';
          const statusCode = 201;

          next({
            message:message,
            statusCode:statusCode,
            result:newUser
          });
         
        })
        .catch(error => next(error));

    }

}