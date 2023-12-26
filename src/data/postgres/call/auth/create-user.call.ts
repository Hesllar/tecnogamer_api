import { CreateUserDto } from "../../../../domain";
import { PostgresDatabase } from "../../postgres-database";
import { Util } from "../../../../config";

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
           
            const query = `select * from create_user(${Util.keyToString(createUserDto)})`
            const [result] = await PostgresDatabase.instanceDB.query(query, {
                replacements:{...createUserDto},
                type: PostgresDatabase.queryTypes.SELECT
            });


            return result as UserPG;

        } catch (error) {
            throw error;
        }
    }

}