import { Router } from "express";
import { AuthController } from "./controller";
import { AuthService } from "../";



export class AuthRoutes {

    public static routes = ():Router =>{

        const router = Router();
        
        const authService = new AuthService();
        
        const authController = new AuthController(authService);
        // Definir las rutas
        router.post('/login',authController.login);
        router.post('/create-user',authController.createUser);

        return router;
    }
}