import { formSchema } from "@/schema/form.schema";
import { HTTP_CODE } from "@/utils/http-code";
import { NextRequest } from "next/server";
import bcryptjs from 'bcryptjs'
import { ZodError } from "zod";
import { PrismaClientValidationError } from "@prisma/client/runtime/library";
import {User} from '@/services/user.service'
import { CustomError } from "@/services/error.service"

export async function POST(req:NextRequest) {
    const payload=await req.json()
    try {
        const {name,email,password,pmkisanId,accountType}=await formSchema.parseAsync(payload)
        const user=new User()
        const isUserAlreadyPresent=await user.getUserByEmail(email)
        if(isUserAlreadyPresent){
            throw new CustomError("User Already Exist",HTTP_CODE.FORBIDDEN)
        }

        if(accountType==='customer' && pmkisanId !=='111111111111'){
            throw new CustomError("Customer should not have PMKISANID",HTTP_CODE.FORBIDDEN)
        }

        const hashpassword=await bcryptjs.hash(password,10)
        const userData=await user.createUser(name,email,hashpassword,accountType,pmkisanId)    
        
        return new Response(JSON.stringify({
            msg:"User created successfully",
            data:userData
        }),{
            status:HTTP_CODE.CREATED,
            headers:{"Content-Type":"application/json"}
        })
    } catch (error) {
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
                status:error.statusCode
            })
        }
        if(error instanceof PrismaClientValidationError){
            console.log(error)
            return new Response(JSON.stringify({
                msg:"Database Error",
                error:error.cause
            }),{
                status:HTTP_CODE.BAD_REQUEST,
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

export const dynamic="force-static"