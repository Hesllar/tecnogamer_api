import jwt from 'jsonwebtoken';
import { EnvsAdapter } from './envs.adapter';

const { seed } = EnvsAdapter.envs();

export class JwtAdapter {

  // DI?

  public static generateToken = async( payload:any, duration: string = '2h' )  => {

    return new Promise((resolve) => {
      jwt.sign(payload, seed, { expiresIn: duration }, (err, token) => {
        
        if ( err ) return resolve(null);
  
        resolve(token)

      });
    })



  }


//   static validateToken<T>(token: string):Promise<T | null> {
    
//     return new Promise( (resolve) => {

//       jwt.verify( token, JWT_SEED, (err, decoded) => {

//         if( err ) return resolve(null);

//         resolve(decoded as T);

//       });



//     })
//   }


}

