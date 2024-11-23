import { ProductGrid } from "@/components/marketplace/product-grid";
import { ProductFilters } from "@/components/marketplace/product-filters";
import { MapView } from "@/components/marketplace/map-view";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function MarketplacePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
          <p className="text-muted-foreground">
            Browse and purchase fresh produce directly from farmers
          </p>
        </div>

        <Tabs defaultValue="grid" className="w-full">
          <TabsList>
            <TabsTrigger value="grid">Grid View</TabsTrigger>
            <TabsTrigger value="map">Map View</TabsTrigger>
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