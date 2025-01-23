import { ProductGrid } from "../_components/marketplace/product-grid";
import { ProductFilters } from "../_components/marketplace/product-filters";
import { MapView } from "../_components/marketplace/map-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">मार्केटप्लेस</h1>
          <p className="text-muted-foreground">
            शेतकऱ्यांकडून थेट ताजे पिके ब्राउझ करा आणि खरेदी करा
          </p>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <TabsList>
            <TabsTrigger value="grid">ग्रिड दृश्य</TabsTrigger>
            <TabsTrigger value="map">नकाशा दृश्य</TabsTrigger>
          </TabsList>
          <TabsContent value="grid" className="space-y-8 mt-6">
            <div className="flex flex-col md:flex-row gap-8">
              <aside className="w-full md:w-64 flex-none">
                <ProductFilters />
              </aside>
              <main className="flex-1">
                <ProductGrid />
              </main>
            </div>
          </TabsContent>
          <TabsContent value="map">
            <MapView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}