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
          <h1 className="text-3xl font-bold tracking-tight">डॅशबोर्ड</h1>
          <p className="text-muted-foreground">
            तुमच्या शेती व्यवसायाचा आढावा आणि बाजारातील अंतर्दृष्टी
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">एकूण विक्री</h3>
            <p className="text-2xl font-bold">₹24,500</p>
            <p className="text-sm text-green-600">+12% गेल्या महिन्यापासून</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">सक्रिय ऑर्डर</h3>
            <p className="text-2xl font-bold">18</p>
            <p className="text-sm text-muted-foreground">4 पेंडिंग डिलिव्हरी</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">सूचीबद्ध उत्पादने</h3>
            <p className="text-2xl font-bold">32</p>
            <p className="text-sm text-muted-foreground">8 कमी स्टॉकमध्ये</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-medium text-muted-foreground">ग्राहक रेटिंग</h3>
            <p className="text-2xl font-bold">4.8/5</p>
            <p className="text-sm text-muted-foreground">156 पुनरावलोकनांवर आधारित</p>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">
              <BarChart className="h-4 w-4 mr-2" />
              आढावा
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <LineChart className="h-4 w-4 mr-2" />
              विश्लेषण
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <div className="p-6">
                  <h3 className="text-lg font-medium">किंमत ट्रेंड</h3>
                  <PriceChart />
                </div>
              </Card>
              <Card className="col-span-3">
                <div className="p-6">
                  <h3 className="text-lg font-medium">विक्री आढावा</h3>
                  <SalesOverview />
                </div>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="col-span-1">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">अलीकडील ऑर्डर</h3>
                  <RecentOrders />
                </div>
              </Card>
              <Card className="col-span-1">
                <div className="p-6">
                  <h3 className="text-lg font-medium mb-4">उत्पादन सूची</h3>
                  <ProductInventory />
                </div>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="analytics">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium mb-4">तपशीलवार विश्लेषण</h3>
                <p className="text-muted-foreground">
                  तपशीलवार विश्लेषण आणि अंतर्दृष्टी येथे प्रदर्शित केली जाईल.
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}