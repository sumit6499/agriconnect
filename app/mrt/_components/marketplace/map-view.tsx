"use client";

import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useEffect, useState } from "react";

const MOCK_LOCATIONS = [
  {
    id: "1",
    name: "ऑर्गेनिक शेत",
    position: [12.9716, 77.5946], // बंगळूर
    products: ["टोमॅटो", "गाजर"],
    price: "₹30-50/किलो",
  },
  {
    id: "2",
    name: "ग्रीन व्हॅली शेत",
    position: [13.0827, 77.5877], // बंगळूर जवळ
    products: ["गहू", "तांदूळ"],
    price: "₹40-60/किलो",
  },
];

export function MapView() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Card className="mt-6">
      <div className="h-[600px] w-full">
        <MapContainer
          center={[12.9716, 77.5946]}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {MOCK_LOCATIONS.map((location) => (
            <Marker
              key={location.id}
              position={location.position as [number, number]}
              icon={new Icon({ iconUrl: './marker.png', iconSize: [35, 41], iconAnchor: [12, 41] })}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{location.name}</h3>
                  <p className="text-sm">उत्पादने: {location.products.join(", ")}</p>
                  <p className="text-sm">किंमत श्रेणी: {location.price}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Card>
  );
}