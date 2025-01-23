

export class CustomError extends Error{
    public statusCode:number
    constructor(msg:string,statusCode:number){
        super()
        this.message=msg
        this.statusCode=statusCode
    }
}