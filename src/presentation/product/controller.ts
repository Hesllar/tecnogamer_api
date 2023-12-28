import { Request, Response } from "express";
import { 
    CreateLogDto, 
    CreateProductDto,
    CustomError, 
    UpdateProductByIdDto,
  } from "../../domain";
import { HandleHttp } from "../../config";
import { ProductService } from "../services";


export class ProductController {

    //DI
    constructor(
      private readonly productService:ProductService
    ){}

    private handleError = (error: any, res: Response, req:Request ) => {
      
      const params = {...req.body, ...req.params, ...req.query}

      if ( error instanceof CustomError ) {
        return res.status(error.statusCode).json(
          HandleHttp.error({
            message:error.message,
            statusCode:error.statusCode,
            result:null,
            params,
            stack:CreateLogDto.create(JSON.parse(error.stack), req)
          }));
      }

      const statusCode = 500;

      return res.status(statusCode).json(
          HandleHttp.error({
            message:'Error no controlado',
            statusCode:statusCode,
            result:null,
            params,
            stack:CreateLogDto.create({
              stack:{stack:error.stack, message:error.message},
              status_code:statusCode,
            }, req)
        }));
    } 

    public getProducts = (req: Request, res: Response) => {
      
      this.productService.getProducts()
        .then(products =>{
          const message = 'Productos listados correctamente';
          const statusCode = 200;

          return res.status(statusCode).json(HandleHttp.success({
            message:message,
            statusCode:statusCode,
            result:products,
            params:null,
            stack:CreateLogDto.create({
              message,
              is_error:false,
              status_code: statusCode, 
              code:1,
              level:'info'
            }, req)
          }));
        })
        .catch(error => this.handleError(error, res, req));

    }

    public getProductById = (req: Request, res: Response) => {

      const id = +req.params.id;

      if(isNaN(id)) {

        const message = 'El parámetro id, debe ser un tipo numérico';

        return res.status(400).json(
          HandleHttp.error({
            message,
            result:null,
            params:req.params,
            stack:CreateLogDto.create({message}, req)
            })
        );
      }
      
      this.productService.getProductById(id)
        .then(productById => {
          const message = 'Producto listados correctamente';
          const statusCode = 200;

          return res.status(statusCode).json(HandleHttp.success({
            message:message,
            statusCode:statusCode,
            result:productById,
            params:req.params,
            stack:CreateLogDto.create({
              message,
              is_error:false,
              status_code: statusCode, 
              code:1,
              level:'info'
            }, req)
          }));
        })
        .catch(error => this.handleError(error, res, req));

    }

    public createProduct = (req: Request, res: Response) => {
    
      const [error, createProductDto] = CreateProductDto.create(req.body);

      if(error){
        return res.status(400).json(
          HandleHttp.error({
            message:error,
            result:null,
            params:req.body,
            stack:CreateLogDto.create({ message: error}, req)
            }));
      } 


      this.productService.createProduct(createProductDto!)
        .then(newProduct =>{
          const message = 'Producto creado correctamente';
          const statusCode = 201;

          return res.status(statusCode).json(HandleHttp.success({
            message:message,
            statusCode:statusCode,
            result:newProduct,
            params:req.body,
            stack:CreateLogDto.create({
              message,
              is_error:false,
              status_code: statusCode, 
              code:1,
              level:'info'
            }, req)
          }));
        })
        .catch(error => this.handleError(error, res, req));
      }

      public updateProductById = (req: Request, res: Response) => {
        const body = {
          ...req.body,
          id:+req.params.id
        };

        const [error, updateProductByIdDtio] = UpdateProductByIdDto.update(body);
  
        if(error){
          return res.status(400).json(
            HandleHttp.error({
              message:error,
              result:null,
              params:body,
              stack:CreateLogDto.create({ message: error}, req)
              }));
        } 
      
  
        this.productService.updateProductById(updateProductByIdDtio!)
          .then(updateProduct =>{
            const message = 'Producto actualizado correctamente';
            const statusCode = 200;
  
            return res.status(statusCode).json(HandleHttp.success({
              message:message,
              statusCode:statusCode,
              result:updateProduct,
              params:body,
              stack:CreateLogDto.create({
                message,
                is_error:false,
                status_code: statusCode, 
                code:1,
                level:'info'
              }, req)
            }));
          })
          .catch(error => this.handleError(error, res, req));
        }

        public deleteProductById = (req: Request, res: Response) => {
        
          const id = +req.params.id;

          if(isNaN(id)) {

            const message = 'El parámetro id, debe ser un tipo numérico';

            return res.status(400).json(
              HandleHttp.error({
                message,
                result:null,
                params:req.params,
                stack:CreateLogDto.create({message}, req)
                })
            );
          } 
            
          this.productService.deleteProductById(id)
            .then(deleteProduct =>{
              const message = 'Producto eliminado correctamente';
              const statusCode = 200;
    
              return res.status(statusCode).json(HandleHttp.success({
                message:message,
                statusCode:statusCode,
                result:deleteProduct,
                params:req.params,
                stack:CreateLogDto.create({
                  message,
                  is_error:false,
                  status_code: statusCode, 
                  code:1,
                  level:'info'
                }, req)
              }));
            })
            .catch(error => this.handleError(error, res, req));
          }

}