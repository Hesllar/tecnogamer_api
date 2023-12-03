import { Router } from "express";
import { AuthController } from "./controller";



export class AuthRoutes {

    public static routes = ():Router =>{

        const router = Router();
        
        const authController = new AuthController();
        // Definir las rutas
        router.use('/login',authController.login);

        return router;
    }
}