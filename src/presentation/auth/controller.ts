import { Request, Response } from "express";
import { CreateUserDto, CustomError } from "../../domain";




export class AuthController {

    //DI
    constructor(){}

    private handleError = (error: unknown, res: Response ) => {
        if ( error instanceof CustomError ) {
          return res.status(error.statusCode).json({ error: error.message });
        }
    
        return res.status(500).json({ error: 'Internal server error' })
      } 

    public login = (req: Request, res: Response) =>{
        
        throw new Error('Method not implemented');
    }

    public createUser = (req: Request, res: Response) => {

      const [error, createUserDto] = CreateUserDto.create(req.body);

      if(error) return res.status(400).json({error});

      res.json('Hola');
    }

}