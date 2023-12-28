

export class Util {

    public static keyToString = (objectKey: {[key:string] : any}) => {
        return Object.keys(objectKey).map(key => (`:${key}`)).toString();
    }

    public static setNodeEnv = () =>{
        switch (process.env.NODE_ENV) {
            case 'dev':
                process.env.NODE_ENV = 'development';
                return 'dev';
            case 'prod':
                process.env.NODE_ENV = 'production';
                return 'prod';
            case 'local':
                process.env.NODE_ENV = 'local';
                return 'local';
            default:
                return null;
        }

    }
}