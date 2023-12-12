import { Sequelize } from 'sequelize';


export interface PostgresOptions {
    db_name:        string;
    db_user:        string;
    db_password:    string;
}



export class PostgresDatabase {

    public static instanceDB:Sequelize;
    
    public static connection = async (options:PostgresOptions) => {

        const { db_name,  db_user, db_password} = options;

        try {
         
            PostgresDatabase.instanceDB = new Sequelize(db_name, db_user, db_password, {
                host: 'localhost',
                port: 1213,
                dialect: 'postgres'
              });
            

            await PostgresDatabase.instanceDB.authenticate();
            
        } catch (error) {

            console.log('Error', error);

            throw error;
        }
    }

}