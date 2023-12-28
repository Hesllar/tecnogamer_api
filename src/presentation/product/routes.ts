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

        // *GET
        router.get('/', productController.getProducts);
        router.get('/:id', productController.getProductById);

        // *POST
        router.post('/', AuthMiddleware.validateJWT, productController.createProduct);

        // *PUT
        router.put('/:id', AuthMiddleware.validateJWT, productController.updateProductById);

        // *DELETE
        router.delete('/:id', AuthMiddleware.validateJWT, productController.deleteProductById);

        return router;
    }
}