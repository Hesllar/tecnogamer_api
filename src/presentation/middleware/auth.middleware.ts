import { Request, Response, NextFunction } from "express";
import { CreateLogDto, User } from "../../domain";
import { JwtAdapter, HandleHttp } from "../../config";
import { ValidatorService } from "../services";




export class AuthMiddleware {

    public static validateJWT = async (req:Request, res:Response, next:NextFunction) =>{
        
        const statusCode = 401;

        const authorization = req.header('x-access-token');

        if(!authorization) return res.status(statusCode).json(
                HandleHttp.error({
                message:'Token no proveído',
                statusCode:statusCode,
                result:null,
                params:null,
                stack:CreateLogDto.create({status_code:statusCode, message:'Token no proveído'}, req)
            })
          );

        try {
            
            const payload = await JwtAdapter.validateToken<User>(authorization);
            
            if(!payload) return res.status(statusCode).json(
                    HandleHttp.error({
                    message:'Token inválido',
                    statusCode:statusCode,
                    result:null,
                    params:null,
                    stack:CreateLogDto.create({status_code:statusCode, message:'Token inválido'}, req)
                })
            );
        
            
            const existsEmail = await ValidatorService.validateUserEmailPG(payload.email);

            if(!existsEmail) return res.status(statusCode).json(
                    HandleHttp.error({
                    message:'Token invalido - usuario no registrado',
                    statusCode:statusCode,
                    result:null,
                    params:null,
                    stack:CreateLogDto.create({status_code:statusCode, message:'Token invalido - usuario no registrado'}, req)
                })
            );
            
            req.body.user = {username: payload.email, id: payload.id};

            next();

        } catch (error ) {
            if(error instanceof Error){
                return res.status(500).json(
                    HandleHttp.error({
                    message:'Error no controlado',
                    statusCode:500,
                    result:null,
                    params:null,
                    stack:CreateLogDto.create({
                        status_code:500,
                        stack:{stack:error.stack, message:error.message},
                    }, req)
                })
            );
            }
        }


    }




}