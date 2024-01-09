import { NextFunction, Request, Response } from "express";
import { CustomError, GetUserByEmailDto } from "../../domain";
import { UserService } from "../services";

export class UserController {

    //DI
    constructor(
      private readonly userService:UserService
    ){}

    public getUsers = (req: Request, res: Response, next:NextFunction) => {
      
      this.userService.getUsers()
        .then(users =>{

          const message = 'Usuarios obtenidos correctamente';
          const statusCode = 200;

          next({
            message:message,
            statusCode:statusCode,
            result:users
          });
        })
        .catch(error => next(error));

    }


    public getUserByEmail = (req: Request, res: Response, next:NextFunction) => {
      
      const [error, getUserByEmailDto] = GetUserByEmailDto.create(req.params);

      if(error) return next(CustomError.badRequest(error));
      
      this.userService.getUserByEmail(getUserByEmailDto?.email!)
        .then(user =>{

          const { password, ...resto} = user!;
          const message = 'Usuario obtenido correctamente';
          const statusCode = 200;

          next({
            message:message,
            statusCode:statusCode,
            result:resto
          });
        })
        .catch(error => next(error));

    }

}