import { PostgresDatabase } from "../../postgres-database";
import { Util } from "../../../../config";
import { CreateBrandDto } from "../../../../domain";

export interface CrateBrandPG{
    id:             number;
    name:           string;
    description:    string;
    created_at:     string;
}

export class CreateBrandCall {

    public static createBrandPG = async(createBrandDto:CreateBrandDto):Promise<CrateBrandPG> => {

        try {
           
            const query = `select * from create_brand(${Util.keyToString(createBrandDto)})`;
            const [result] = await PostgresDatabase.instanceDB.query(query, {
                replacements:{...createBrandDto},
                type: PostgresDatabase.queryTypes.SELECT
            });


            return result as CrateBrandPG;

        } catch (error) {
            throw error;
        }
    }

}