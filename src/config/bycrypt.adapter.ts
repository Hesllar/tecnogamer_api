import {genSaltSync, hashSync, compareSync} from 'bcrypt';

export class BycryptAdapter {


    public static hash =  (password:string) =>{
        const salt = genSaltSync();
        return hashSync(password, salt);
    }

    public static compare = (password:string, hashed: string) => compareSync(password, hashed);
    
}