

export class Util {

    public static keyToString = (objectKey: {[key:string] : any}) => {
        return Object.keys(objectKey).map(key => (`:${key}`)).toString();
    }
}