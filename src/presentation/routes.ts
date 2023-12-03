import { Router } from "express";
import { AuthRoutes, TestRoutes } from "./";




export class AppRoutes {

    public static routes = ():Router =>{
        
        const router = Router();

        // Definir las rutas
        router.use('/api/auth', AuthRoutes.routes());
        router.use('/api/test', TestRoutes.routes());

        return router;
    }
}