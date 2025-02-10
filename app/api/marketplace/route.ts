import { NextRequest, NextResponse } from "next/server";
import {marketplaceSchema} from '@/schema/marketplace.schema'
import { ZodError } from "zod";
import { HTTP_CODE } from "@/utils/http-code";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { db } from "@/lib/db.config";

export async function POST(req:NextRequest){
    try {
        const body = await req.json();
        const payload = marketplaceSchema.parse(body);
        
        await db.product.create({
            data: {
                name: payload.productName,
                description: payload.description,
                price: payload.price,
                quantity: payload.quantity,
                unit: payload.unit,
                predictedPrice: payload.price,
                category: payload.category,
                farmerId: 'cm69kujn10005ld7lhcb9yvd2',
                imageUrl: payload.imageUrl
            }
        })


        return new NextResponse(JSON.stringify({
            msg: "New product added successfully"
        }),{
            status: HTTP_CODE.CREATED,
            headers: {"Content-Type":"application/json"}
        });
    } catch (error) {
        console.log(error)
        if (error instanceof ZodError){
            return new NextResponse(JSON.stringify({
                msg: error.flatten().fieldErrors,
                error: error.flatten().formErrors
            }),{
                status: HTTP_CODE.BAD_REQUEST,
                headers: {"Content-Type": "application/json"}
            });
        }

        if (error instanceof PrismaClientInitializationError) {
            return new NextResponse(JSON.stringify({
                msg: "Database Intialization error",
                err: "Prisma Intialization error"
            }),{
                status: HTTP_CODE.BAD_REQUEST,
                headers: {"Content-Type": "application/json"}
            });
        }

        return new NextResponse(JSON.stringify({
            msg: "Internal Server Error",
            err: error
        }),{
            status: HTTP_CODE.SERVER_ERROR,
            headers: {"Content-Type":"application/json"}
        });
    }
}