import { db } from "@/lib/db.config"

export class User{
    public async getUserByEmail(email:string){
        return await db.user.findFirst({
            where:{
                email:email
            }
        })
    }
    public async getUserByName(name:string){
        return await db.user.findFirst({
            where:{
                name:name
            }
        })
    }
    public async createUser(name:string,email:string,hashpassword:string,accountType:'farmer'|'customer',pmKisanId:string){
        return await db.user.create({
                    data:{
                        name,
                        email,
                        role:accountType==='farmer'?'FARMER':'CUSTOMER',
                        password:hashpassword,
                        pmKisanId:pmKisanId?pmKisanId:undefined
                    }
                })  
    }
}

export class Farmer extends User{
    
    public async getUserByKisanId(pmKisanId:string){
        return await db.user.findFirst({
            where:{
                pmKisanId:pmKisanId
            }
        })
    }

    public async getFarmer(){
        return await db.user.findFirst({
            where:{
                role:'FARMER'
            }
        })
    }

    public async getAllFarmers(){
        return await db.user.findMany({
            where:{
                role:'FARMER'
            }
        })
    }
}

export class Customer extends User{
    public async getCustomer(){
        return await db.user.findFirst({
            where:{
                role:'CUSTOMER'
            }
        })
    }
    public async getAllCustomers(){
        return await db.user.findMany({
            where:{
                role:'CUSTOMER'
            }
        })
    }

}
