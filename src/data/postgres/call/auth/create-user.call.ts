import { CreateUserDto } from "../../../../domain";
import { PostgresDatabase } from "../../postgres-database";

export interface User{
    id:             number;
    email:          string;
    description:    string;
    role_user_id:   number;
    created_at:     string;
}

export class CreateUserCall {

    public static createUserPG = async(createUserDto:CreateUserDto):Promise<User> => {

        try {
            const {
                email,
                name,
                password,
                description,
                roleUserId
            } = createUserDto;
    
            const query = 'select * from create_user(?, ?, ?, ?, ?)'
            const [result] = await PostgresDatabase.instanceDB.query(query, {
                replacements:[email ,name ,password ,description ,roleUserId],
                type: PostgresDatabase.queryTypes.SELECT
            });


            return result as User;

        } catch (error) {
            throw error;
        }
    }

}