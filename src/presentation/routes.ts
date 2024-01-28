import { Router } from "express";
import { 
    AuthRoutes, 
    BrandRoutes, 
    HandleHttp, 
    ProductRoutes,
    TestRoutes, 
    UserRoutes,
} from "./";




export class AppRoutes {

    public static routes = ():Router =>{
        
        const router = Router();

        // Definir las rutas
        //* AUTH
        router.use('/api/auth', AuthRoutes.routes());

        //* TEST
        router.use('/api/test', TestRoutes.routes());

        //* PRODUCT
        router.use('/api/product', ProductRoutes.routes());

        //* USER
        router.use('/api/user', UserRoutes.routes());

        //* BRAND
        router.use('/api/brand', BrandRoutes.routes());

        router.use(HandleHttp.handle);

        return router;
    }
}