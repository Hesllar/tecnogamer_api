
import { CreateLogCall } from '../../data';
import { CustomError, CreateLogProps} from '../../domain';




export class LogService {

    public static createLog = async (createLogDto:CreateLogProps) => {
        
        try {

            const newLog = await CreateLogCall.createLogPG(createLogDto);

            return newLog;

        } catch (error) {
            if(error instanceof Error) throw CustomError.iternalServer('Error no controlado',{
                status_code:500,
                stack:{stack:error.stack, message:error.message}
            });
        }
    }


}