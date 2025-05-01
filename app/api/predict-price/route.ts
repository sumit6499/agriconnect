import { NextResponse } from "next/server";
import { db } from "@/lib/db.config";

export async function POST(req: Request) {
  try {
    const { product, season, marketplace } = await req.json();

    const productData = await db.product.findFirst({
      where: { name: product },
    });

    if (!productData) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const previousPrice = productData.price;

    const seasonalMultiplier = getSeasonMultiplier(season);
    
    // Get the city from the marketplace and calculate the multiplier
    const city = extractCityFromMarketplace(marketplace);
    const locationMultiplier = getMarketplaceMultiplier(city);

    const predictedPrice = previousPrice * seasonalMultiplier * locationMultiplier;

    return NextResponse.json({ predictedPrice });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}

// Function to get the seasonal multiplier
function getSeasonMultiplier(season: string) {
  switch (season) {
    case "Summer": return 1.05;
    case "Winter": return 0.95;
    case "Rainy": return 1.1;
    default: return 1;
  }
}

// Function to extract the city from the marketplace string
function extractCityFromMarketplace(marketplace: string) {
  const parts = marketplace.split(",").map(p => p.trim());
  return parts[parts.length - 2]; // Assuming the city is second last
}

// Function to get the multiplier based on the city
function getMarketplaceMultiplier(city: string) {
  const cityMultipliers: Record<string, number> = {
    "Mumbai": 1.1,
    "Pune": 1.05,
    "Nagpur": 1.02,
    "Nashik": 1.03,
    "Aurangabad": 1.04,
    "Solapur": 1.02,
    "Thane": 1.06,
    "Kalyan": 1.04,
    "Kolhapur": 1.03,
    "Chandrapur": 1.01,
    // Add more cities as needed
  };

  // Default to 1 if the city is not listed
  return cityMultipliers[city] || 1;
}
