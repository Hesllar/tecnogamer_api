import { Request, Response, NextFunction } from "express";
import { CustomError, User } from "../../domain";
import { JwtAdapter } from "../../config";





export class AuthMiddleware {

    public static validateJWT = async (req:Request, res:Response, next:NextFunction) =>{
        
        const authorization = req.header('x-access-token');

        if(!authorization) return next(CustomError.unauthorized('Token no proveído'))

        try {
            
            const payload = await JwtAdapter.validateToken<User>(authorization);
            
            if(!payload) return next(CustomError.unauthorized('Token invalido'));
        
            req.body.user = {username: payload.email, id: payload.id};

            next();

        } catch (error ) {
            if(error instanceof Error)
                return next(CustomError.iternalServer('Error no controlado',{stack:{stack:error.stack, message:error.message}}))
        }


    }




}