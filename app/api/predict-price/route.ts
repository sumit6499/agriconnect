import { NextResponse } from "next/server";
import { db } from "@/lib/db.config";

export async function POST(req: Request) {
  try {
    const { product, season } = await req.json();

    const productData = await db.product.findFirst({
      where: { name: product },
    });

    if (!productData) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const previousPrice = productData.price;

    const seasonalMultiplier = getSeasonMultiplier(season);

    const predictedPrice = previousPrice * seasonalMultiplier;

    return NextResponse.json({ predictedPrice });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

function getSeasonMultiplier(season: string) {
  switch (season) {
    case "Summer": return 1.05;
    case "Winter": return 0.95;
    case "Rainy": return 1.1;
    default: return 1;
  }
}
