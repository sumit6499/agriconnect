import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { db } from "@/lib/db.config";


export async function ProductGrid() {
  const MOCK_PRODUCTS=await db.product.findMany({
    relationLoadStrategy:'join',
    include:{
      farmer:{
        select:{
          name:true
        }
      },
      location:{
        select:{
          address:true
        }
      }
    }
  })
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_PRODUCTS.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48">
              <Image
                src={product.imageUrl!}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-muted-foreground">{product.location?.address}</p>
            <p className="text-lg font-bold mt-2">
              ₹{product.price}/{product.unit}
            </p>
            <p className="text-sm text-muted-foreground">by {product.farmer.name}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full">Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}