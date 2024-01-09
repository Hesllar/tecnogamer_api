import { NextFunction, Request, Response } from "express";
import { 
    CreateProductDto,
    CustomError, 
    UpdateProductByIdDto,
  } from "../../domain";
import { ProductService } from "../services";


export class ProductController {

    //DI
    constructor(
      private readonly productService:ProductService
    ){}

    public getProducts = (req: Request, res: Response, next:NextFunction) => {
      
      this.productService.getProducts()
        .then(products =>{
          const message = 'Productos listados correctamente';
          const statusCode = 200;

          next({
            message:message,
            statusCode:statusCode,
            result:products
          });
        })
        .catch(error => next(error));

    }

    public getProductById = (req: Request, res: Response, next:NextFunction) => {

      const id = +req.params.id;
      
      if(isNaN(id)) return next(CustomError.badRequest('El parámetro id, debe ser un tipo numérico'));
      
      this.productService.getProductById(id)
        .then(productById => {
          const message = 'Producto listados correctamente';
          const statusCode = 200;

          next({
            message:message,
            statusCode:statusCode,
            result:productById
          });
        })
        .catch(error => next(error));

    }

    public createProduct = (req: Request, res: Response, next:NextFunction) => {
    
      const [error, createProductDto] = CreateProductDto.create(req.body);

      if(error) return next(CustomError.badRequest(error));

      this.productService.createProduct(createProductDto!)
        .then(newProduct =>{
          const message = 'Producto creado correctamente';
          const statusCode = 201;

          next({
            message:message,
            statusCode:statusCode,
            result:newProduct
          });
        })
        .catch(error => next(error));
    }

    public updateProductById = (req: Request, res: Response, next:NextFunction) => {

        const body = {
          ...req.body,
          id:+req.params.id
        };

        const [error, updateProductByIdDtio] = UpdateProductByIdDto.update(body);
  
        if(error) return next(CustomError.badRequest(error));
      
        this.productService.updateProductById(updateProductByIdDtio!)
          .then(updateProduct =>{
            const message = 'Producto actualizado correctamente';
            const statusCode = 200;

            next({
              message:message,
              statusCode:statusCode,
              result:updateProduct
            });
            
          })
          .catch(error => next(error));
    }

        public deleteProductById = (req: Request, res: Response, next:NextFunction) => {
        
          const id = +req.params.id;

          if(isNaN(id)) return next(CustomError.badRequest('El parámetro id, debe ser un tipo numérico'));
            
          this.productService.deleteProductById(id)
            .then(deleteProduct =>{
              const message = 'Producto eliminado correctamente';
              const statusCode = 200;
    
              next({
                message:message,
                statusCode:statusCode,
                result:deleteProduct
              });
            })
            .catch(error => next(error));
          }

}