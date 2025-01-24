import { db } from '@/lib/db.config'
import { location } from '@/types/types'
import { HTTP_CODE } from '@/utils/http-code'
import { PrismaClientInitializationError} from '@prisma/client/runtime/library'
import {NextRequest} from 'next/server'

export async function GET(req:NextRequest) {
    try {
        const locations=await db.location.findMany({
            relationLoadStrategy:'join',
            include:{
                product:{
                    select:{
                        name:true,
                        price:true
                    }
                }
            }
        })

        return new Response(JSON.stringify({
            msg:"Location Fetching success",
            data:locations
        }),{
            status:HTTP_CODE.OK,
            headers:{"Content-Type":'application/json'}
        })
    } catch (error) {
        if(error instanceof PrismaClientInitializationError){
            return new Response(JSON.stringify({
                msg:"Database Connection failed"
            }),{
                status:HTTP_CODE.SERVER_ERROR,
                headers:{"Content-Type":'application/json'}
            })
        }

        return new Response(JSON.stringify({
            msg:"Internal Server Error"
        }),{
            status:HTTP_CODE.SERVER_ERROR,
            headers:{"Content-Type":'application/json'}
        })
    }
}