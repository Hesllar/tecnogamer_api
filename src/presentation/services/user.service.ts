import { HandleErrorDB } from '../../config';
import { GetUserByEmailCall, GetUsersCall } from '../../data';


export class UserService {

    //DI
    constructor(){}

    public getUsers = async () => {

        try {

            const getUsers = await GetUsersCall.getUsersPG();

            return getUsers;

        } catch (error) {
            if(error instanceof Error) throw HandleErrorDB.validate(error);
        }
    }

    public getUserByEmail = async (email:string) => {
        try {
            
            const userByEmail = await GetUserByEmailCall.getUserByEmailPG(email);
            
            return userByEmail;

        } catch (error) {
            if(error instanceof Error) throw HandleErrorDB.validate(error);
        }
    }


}