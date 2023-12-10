import { Sequelize } from 'sequelize';


export interface PostgresOptions {
    db_name:        string;
    db_user:        string;
    db_password:    string;
}



export class PostgresDatabase {
    
    public static connection = async (options:PostgresOptions) => {

        const { db_name,  db_user, db_password} = options;

        try {

            const sequelize = new Sequelize(db_name, db_user, db_password, {
                host: 'localhost',
                port: 1213,
                dialect: 'postgres'
              });
            
            
            await sequelize.authenticate();

            console.log('Db connected');

        } catch (error) {

            console.log('Error', error);

            throw error;
        }
    }

}