import { CustomError } from "../domain";

export class HandleErrorDB {


    public static validate = (error:Error) => {

        if(error.name === 'SequelizeDatabaseError'){
                    
            const errorSequelize = error as unknown as {parent:{code:string}};
            
            if(errorSequelize.parent.code === 'P0001') return CustomError.badRequest(error.message);
            
        }
        return CustomError.iternalServer('Error no controlado',{
            stack:{stack:error.stack, message:error.message}
        });
    }
}