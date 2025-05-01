import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { db } from "@/lib/db.config";

export async function ProductGrid() {
  // Fetch products with joined relations (only if Prisma 5+ is used)
  const products = await db.product.findMany({
    // Comment out this line if you're using Prisma < 5
    // relationLoadStrategy: 'join', 
    include: {
      farmer: {
        select: {
          name: true,
        },
      },
      location: {
        select: {
          address: true,
        },
      },
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48">
              <Image
                src={product.imageUrl || "/placeholder.png"} // fallback image
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-muted-foreground">
              {product.location?.address || "पत्ता उपलब्ध नाही"}
            </p>
            <p className="text-lg font-bold mt-2">
              ₹{product.price}/{product.unit}
            </p>
            <p className="text-sm text-muted-foreground">
              द्वारे {product.farmer?.name || "शेतकरी माहिती नाही"}
            </p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full">कार्टमध्ये जोडा</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
