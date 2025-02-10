import { NextRequest} from "next/server";
import { ZodError } from "zod";
import {HTTP_CODE} from '@/utils/http-code'
import { LoginSchema } from "@/schema/login.schema";
import { User } from "@/services/user.service";
import { CustomError } from "@/services/error.service";
import bcrypt from 'bcryptjs'

export async function GET() {
    return new Response(JSON.stringify({
        msg:"Hello from server"
    }),{
        status:HTTP_CODE.OK,
        headers:{"Content-Type":"application/json"}
    })
}

export async function POST(req:NextRequest) {
    const payload=await req.json()
    try {
        console.log(payload)
        const {email,password,pmkisanId,accountType}=await LoginSchema.parseAsync(payload)
        
        const customer=new User()
        const user=await customer.getUserByEmail(email)
        console.log(user)
        

        if(!user){
            throw new CustomError("User Not found",HTTP_CODE.NOT_FOUND)
        }

        const authorized=await bcrypt.compare(password,user.password) 
        const farmerAuthorized=(pmkisanId===user?.pmKisanId)?true:false

        if(!authorized){
            throw new CustomError(`${accountType} Not authorized`,HTTP_CODE.UNAUTHORIZED)
        }

        if(!farmerAuthorized){
            throw new CustomError('PMKISAN ID is not verified',HTTP_CODE.UNAUTHORIZED)
        }


        return new Response(JSON.stringify({
            msg:"Customer logged in success",
            data:user
        }),{
            status:HTTP_CODE.OK,
            headers:{"Content-Type":"application/json","Set-Cookie":`isAuthenticated=${true}; path=/; maxAge=60*60*24`}
        })
    }
    catch (error) {
        console.log(error)
        if(error instanceof ZodError){
            return new Response(JSON.stringify({
                msg:"Please Provide requested fields",
                error:error.flatten().fieldErrors
            }),{
                status:HTTP_CODE.BAD_REQUEST,
            })
        }

        if(error instanceof CustomError){
            return new Response(JSON.stringify({
                msg:error.message,
            }),{
                status:error.statusCode,
            })
        }
       return new Response(JSON.stringify({
            msg:"Internal Server error",
            error:error
       }),{
            status:HTTP_CODE.SERVER_ERROR,
       })
    }
}

export const dynamic= "force-static"