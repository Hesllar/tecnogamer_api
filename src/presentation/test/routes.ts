import { Router } from "express";
import { TestController } from "./controller";



export class TestRoutes {

    public static routes = ():Router =>{

        const router = Router();
        
        const authController = new TestController();
        
        // Definir las rutas
        router.use('/',authController.test);

        return router;
    }
}