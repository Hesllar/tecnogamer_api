import { Router } from "express";
import { BrandController } from "./controller";
import { BrandService } from "../services";




export class BrandRoutes {

    public static routes = ():Router =>{

        const router = Router();
        
        const brandService = new BrandService()

        const brandController = new BrandController(brandService);
        // Definir las rutas
        //* POST
        router.post('/', brandController.createBrand);

        return router;
    }
}