import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Leaf, ShoppingBasket, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 mb-16">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            Connecting Farmers Directly with Consumers
          </h1>
          <p className="text-lg text-muted-foreground">
            AgriConnect empowers farmers with direct market access while providing consumers with fresh, locally-sourced produce at fair prices.
          </p>
          <div className="flex gap-4">
            <Link href="/marketplace">
              <Button size="lg">
                Browse Marketplace
                <ShoppingBasket className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/signup">
              <Button variant="outline" size="lg">
                Join as Farmer
                <Leaf className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex-1">
          <Image
            src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854"
            alt="Farmer in field"
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose AgriConnect?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Leaf className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Direct Farm Access</h3>
            <p className="text-muted-foreground">
              Connect directly with local farmers and access fresh produce without intermediaries.
            </p>
          </Card>
          <Card className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Market Insights</h3>
            <p className="text-muted-foreground">
              Access real-time price predictions and market trends to make informed decisions.
            </p>
          </Card>
          <Card className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <ShoppingBasket className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Secure Transactions</h3>
            <p className="text-muted-foreground">
              Enjoy safe and transparent transactions with our secure payment gateway.
            </p>
          </Card>
        </div>
      </section>

      {/* Market Trends Preview */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Latest Market Trends</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Top Selling Products</h3>
            <div className="space-y-4">
              {["Organic Tomatoes", "Fresh Wheat", "Green Peas"].map((item) => (
                <div key={item} className="flex justify-between items-center">
                  <span>{item}</span>
                  <span className="text-green-600">↑ 12%</span>
                </div>
              ))}
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Price Forecasts</h3>
            <div className="space-y-4">
              {["Rice", "Pulses", "Vegetables"].map((item) => (
                <div key={item} className="flex justify-between items-center">
                  <span>{item}</span>
                  <span className="text-blue-600">Stable</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}