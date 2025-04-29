"use client";

import { Card } from "@/components/ui/card";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useEffect, useState } from "react";
import { location } from "@/types";
import axios from "axios";

export function MapView() {
  const [mounted, setMounted] = useState(false);
  const [locations, setLocations] = useState<location[]>([]);

  useEffect(() => {
    setMounted(true);
    const fetchLocations = async () => {
      try {
        const response = await axios.get<location[]>("/api/locations");
        //@ts-expect-error: response data available
        if (response.data.data)
          //@ts-expect-error: response data available
          setLocations(response.data.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  if (!mounted) return null;

  return (
    <Card className="mt-6">
      <div className="h-[600px] w-full">
        <MapContainer
          center={[18.5204, 73.8567]} // Center at Pune, Maharashtra
          zoom={7}                   // Zoom suitable for Maharashtra
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations?.map((location) => (
            <Marker
              key={location.id}
              position={[location.latitude, location.longitude] as [number, number]}
              icon={new Icon({ iconUrl: "/marker.png", iconSize: [35, 41], iconAnchor: [12, 41] })}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{location.address}</h3>
                  <p className="text-sm">उत्पादन: {location.product.name}</p>
                  <p className="text-sm">किंमत: ₹{location.product.price}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </Card>
  );
}
