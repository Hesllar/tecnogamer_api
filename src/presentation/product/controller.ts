import { Request, Response } from "express";
import { CreateLogDto, CustomError, CreateProductDto} from "../../domain";
import { HandleHttp } from "../../config";
import { ProductService } from "../services";

export class ProductController {

    //DI
    constructor(
      private readonly productService:ProductService
    ){}

    private handleError = (error: any, res: Response, req:Request ) => {

      if ( error instanceof CustomError ) {
        return res.status(error.statusCode).json(
          HandleHttp.error({
            message:error.message,
            statusCode:error.statusCode,
            result:null,
            params:req.body,
            stack:CreateLogDto.create(JSON.parse(error.stack), req)
          }));
      }

      const statusCode = 500;

      return res.status(statusCode).json(
          HandleHttp.error({
            message:'Error no controlado',
            statusCode:statusCode,
            result:null,
            params:req.body,
            stack:CreateLogDto.create({
              stack:{stack:error.stack, message:error.message},
              status_code:statusCode,
            }, req)
        }));
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

}