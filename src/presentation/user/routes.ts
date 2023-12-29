import { Router } from "express";
import { AuthMiddleware } from "../middleware";
import { UserController } from "./";
import { UserService } from "../services";

export class UserRoutes {

    public static routes = ():Router =>{
        
        const router = Router();

        const userService = new UserService();
        
        const userController = new UserController(userService);
        // Definir las rutas
        
        //* GET
        router.get('/', AuthMiddleware.validateJWT, userController.getUsers);
        router.get('/by-email/:email', AuthMiddleware.validateJWT, userController.getUserByEmail);

        return router;
    }
}