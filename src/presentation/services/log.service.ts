import { HandleErrorDB } from '../../config';
import { CreateLogCall } from '../../data';
import { CreateLogProps} from '../../domain';




export class LogService {

    public static createLog = async (createLogDto:CreateLogProps) => {

        CreateLogCall.createLogPG(createLogDto)
            .catch(error =>{
                if(error instanceof Error) throw HandleErrorDB.validate(error);
            } )
    }


}