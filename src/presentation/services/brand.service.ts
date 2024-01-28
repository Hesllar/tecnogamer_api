import { BycryptAdapter, HandleErrorDB, JwtAdapter } from '../../config';
import { CreateUserCall, CreateBrandCall } from '../../data';
import { CreateBrandDto } from '../../domain';




export class BrandService {

    //DI
    constructor(
        
    ){}

    public createBrand = async (createUserDto:CreateBrandDto) => {
        
        try {

            const newBrand = await CreateBrandCall.createBrandPG(createUserDto);
            
            return newBrand;

        } catch (error) {
            if(error instanceof Error) throw HandleErrorDB.validate(error);
        }
    }


}