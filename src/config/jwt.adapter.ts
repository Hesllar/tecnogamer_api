import jwt from 'jsonwebtoken';
import { EnvsAdapter } from './envs.adapter';
import { User } from '../domain';

const { seed } = EnvsAdapter.envs();

export class JwtAdapter {

  // DI?

  public static generateToken = async( payload:User, duration: string = '2h' ): Promise<string | null> => {

    return new Promise((resolve) => {
      jwt.sign(payload, seed, { expiresIn: duration }, (err, token) => {
        
        if ( err ) return resolve(null);
  
        resolve(token as string);

      });
    })
  }


  public static validateToken = <T>(token: string):Promise<T | null> => {
    
    return new Promise( (resolve) => {

      jwt.verify( token, seed, (err, decoded) => {

        if( err ) return resolve(null);

        resolve(decoded as T);

      });
    })
  }

}

