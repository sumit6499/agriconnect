'use client'
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart } from "lucide-react";
import { PriceChart } from "@/components/dashboard/price-chart";
import { SalesOverview } from "@/components/dashboard/sales-overview";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { ProductInventory } from "@/components/dashboard/product-inventory";

export default function DashboardPage() {
  const [product, setProduct] = useState("");
  const [season, setSeason] = useState("");
  const [marketplace, setMarketplace] = useState("");
  const [predictedPrice, setPredictedPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  interface Product {
    id: string;
    name: string;
  }

  interface Marketplace {
    id: string;
    name: string;
    address: string; // Added the 'address' property
  }

  const [products, setProducts] = useState<Product[]>([]);
  const [marketplaces, setMarketplaces] = useState<Marketplace[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (res.ok) setProducts(data.products);
        else setError("Failed to load products.");
      } catch {
        setError("Failed to fetch products.");
      }
    };

    const fetchMarketplaces = async () => {
      try {
        const res = await fetch("/api/locMarketplace");
        const data = await res.json();
        if (res.ok) {
          setMarketplaces(data.locations);
        }
        else setError("Failed to load marketplaces.");
      } catch {
        setError("Failed to fetch marketplaces.");
      }
    };

    fetchProducts();
    fetchMarketplaces();
  }, []);

  const handlePredictPrice = async () => {
    if (!product || !season || !marketplace) {
      setError("Please select product, season, and marketplace.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/predict-price", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product, season, marketplace }),
      });

      const data = await response.json();
      if (response.ok) setPredictedPrice(data.predictedPrice.toFixed(2));
      else setError(data.error || "Prediction failed.");
    } catch {
      setError("Failed to predict price.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your farming business</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6 col-span-4">
            <h3 className="text-lg font-medium mb-4">Predict Price</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handlePredictPrice();
              }}
              className="space-y-4"
            >
              <div>
                <label htmlFor="product" className="block text-sm font-medium">
                  Select Product
                </label>
                <select
                  id="product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full border p-2 mt-2"
                >
                  <option value="">Select a product</option>
                  {products.map((prod) => (
                    <option key={prod.id} value={prod.name}>
                      {prod.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="season" className="block text-sm font-medium">
                  Select Season
                </label>
                <select
                  id="season"
                  value={season}
                  onChange={(e) => setSeason(e.target.value)}
                  className="w-full border p-2 mt-2"
                >
                  <option value="">Select a season</option>
                  <option value="Summer">Summer</option>
                  <option value="Winter">Winter</option>
                  <option value="Rainy">Rainy</option>
                </select>
              </div>

              <div>
                <label htmlFor="marketplace" className="block text-sm font-medium">
                  Choose Marketplace
                </label>
                <select
                  id="marketplace"
                  value={marketplace}
                  onChange={(e) => setMarketplace(e.target.value)}
                  className="w-full border p-2 mt-2"
                >
                  <option value="">Select a marketplace</option>
                  {marketplaces?.map((market) => (
                    <option key={market.address} value={market.address}>
                      {market.address}
                    </option>
                  ))}
                </select>
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Predicting..." : "Predict Price"}
              </Button>
            </form>

            {predictedPrice && (
              <div className="mt-4 text-xl font-bold">
                Predicted Price: ₹{predictedPrice}
              </div>
            )}
            {error && (
              <div className="mt-4 text-sm text-red-500">
                {error}
              </div>
            )}
          </Card>

          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Total Sales</h3>
            <p className="text-2xl font-bold">₹24,500</p>
            <p className="text-sm text-green-600">+12% from last month</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Active Orders</h3>
            <p className="text-2xl font-bold">18</p>
            <p className="text-sm text-muted-foreground">4 pending delivery</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Products Listed</h3>
            <p className="text-2xl font-bold">32</p>
            <p className="text-sm text-muted-foreground">8 low in stock</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">Customer Rating</h3>
            <p className="text-2xl font-bold">4.8/5</p>
            <p className="text-sm text-muted-foreground">Based on 156 reviews</p>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">
              <BarChart className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <LineChart className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <div className="p-6">
                  <h3 className="text-lg font-medium">Price Trends</h3>
                  <PriceChart />
                </div>
              </Card>
              <Card className="col-span-3">
                <div className="p-6">
                  <h3 className="text-lg font-medium">Sales Overview</h3>
                  <SalesOverview />
                </div>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
                  <RecentOrders />
                </div>
              </Card>
              <Card className="col-span-1">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">Product Inventory</h3>
                  <ProductInventory />
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">Detailed Analytics</h3>
                <p className="text-muted-foreground">
                  Detailed analytics and insights will be displayed here.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
