import { CreateUserDto } from "../../../../domain";
import { PostgresDatabase } from "../../postgres-database";

export interface UserPG{
    id:             number;
    email:          string;
    description:    string;
    role_user_id:   number;
    created_at:     string;
}

export class CreateUserCall {

    public static createUserPG = async(createUserDto:CreateUserDto):Promise<UserPG> => {

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


            return result as UserPG;

        } catch (error) {
            throw error;
        }
    }

}