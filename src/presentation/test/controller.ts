
import { Request, Response } from "express";



export class TestController {

    //DI
    constructor(){}

    public test = (req: Request, res: Response) =>{
        
        res.status(200).json({
            node: process.version,
            env: process.env.ENV,
            uptime: process.uptime(),
            ok:true,
            date: new Date(),
        });
    }

}
