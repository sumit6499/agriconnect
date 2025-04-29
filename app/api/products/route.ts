// pages/api/products.ts

import { NextResponse } from "next/server";
import { HTTP_CODE } from "@/utils/http-code";
import { db } from "@/lib/db.config";

export async function GET() {
  try {
    const products = await db.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        predictedPrice: true,
        quantity: true,
        unit: true,
        category: true,
        imageUrl: true,
      }
    });

    return new NextResponse(JSON.stringify({
      products
    }), {
      status: HTTP_CODE.OK,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.log(error);
    return new NextResponse(JSON.stringify({
      msg: "Internal Server Error",
      err: error
    }), {
      status: HTTP_CODE.SERVER_ERROR,
      headers: { "Content-Type": "application/json" }
    });
  }
}
