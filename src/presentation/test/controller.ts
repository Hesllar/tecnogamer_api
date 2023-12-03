
import { Request, Response } from "express";



export class TestController {

    //DI
    constructor(){}

    public test = (req: Request, res: Response) =>{
        
        res.json({ok:true});
    }

}
