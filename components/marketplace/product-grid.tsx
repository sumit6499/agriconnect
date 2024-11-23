"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const MOCK_PRODUCTS = [
  {
    id: "1",
    name: "Organic Tomatoes",
    price: 2.99,
    unit: "kg",
    location: "Karnataka, India",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
    farmer: "John Doe",
  },
  {
    id: "2",
    name: "Fresh Wheat",
    price: 1.99,
    unit: "kg",
    location: "Punjab, India",
    imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b",
    farmer: "Jane Smith",
  },
  {
    id: "3",
    name: "Green Peas",
    price: 3.49,
    unit: "kg",
    location: "Uttar Pradesh, India",
    imageUrl: "https://images.unsplash.com/photo-1587735243615-c03f25aaff15",
    farmer: "Mike Johnson",
  },
];

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_PRODUCTS.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative h-48">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-muted-foreground">{product.location}</p>
            <p className="text-lg font-bold mt-2">
              ₹{product.price}/{product.unit}
            </p>
            <p className="text-sm text-muted-foreground">by {product.farmer}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button className="w-full">Add to Cart</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}