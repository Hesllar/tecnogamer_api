import { Router } from "express";
import { ProductController } from "./controller";
import { ProductService } from "../services";
import { AuthMiddleware } from "../middleware";



export class ProductRoutes {

    public static routes = ():Router =>{

        const router = Router();

        const productService = new ProductService();
        
        const productController = new ProductController(productService);
        
        // Definir las rutas
        router.post('/', AuthMiddleware.validateJWT, productController.createProduct);

        return router;
    }
}