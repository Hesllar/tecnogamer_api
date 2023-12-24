import { Router } from "express";
import { AuthRoutes, TestRoutes, ProductRoutes } from "./";




export class AppRoutes {

    public static routes = ():Router =>{
        
        const router = Router();

        // Definir las rutas
        router.use('/api/auth', AuthRoutes.routes());
        router.use('/api/test', TestRoutes.routes());
        router.use('/api/product', ProductRoutes.routes());

        return router;
    }
}