"use client";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart } from "lucide-react";
import { PriceChart } from "@/components/dashboard/price-chart";
import { SalesOverview } from "@/components/dashboard/sales-overview";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { ProductInventory } from "@/components/dashboard/product-inventory";

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your farming business and market insights
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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