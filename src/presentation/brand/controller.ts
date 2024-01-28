import { NextFunction, Request, Response } from "express";
import {  CreateBrandDto, CustomError } from "../../domain";
import { BrandService } from "../services";



export class BrandController {

    //DI
    constructor(
      private readonly BrandService:BrandService
    ){}

    public createBrand = (req: Request, res: Response, next:NextFunction) => {
         
    const [error, createBrandDto] = CreateBrandDto.create(req.body);

    if(error) return next(CustomError.badRequest(error));
      

      this.BrandService.createBrand(createBrandDto!)
        .then(newBrand =>{

          const message = 'Marca creada correctamente';
          const statusCode = 201;

          next({
            message,
            statusCode,
            result:newBrand
          });
         
        })
        .catch(error => next(error));

    }

}