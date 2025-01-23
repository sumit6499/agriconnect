"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-2">
          <Label>शोधा</Label>
          <Input placeholder="उत्पादने शोधा..." />
        </div>

        <div className="space-y-2">
          <Label>श्रेणी</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="श्रेणी निवडा" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vegetables">भाजीपाला</SelectItem>
              <SelectItem value="fruits">फळे</SelectItem>
              <SelectItem value="grains">धान्य</SelectItem>
              <SelectItem value="pulses">डाळी</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>किंमत श्रेणी (₹)</Label>
          <Slider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={setPriceRange}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>स्थान</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="स्थान निवडा" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="karnataka">कर्नाटक</SelectItem>
              <SelectItem value="punjab">पंजाब</SelectItem>
              <SelectItem value="up">उत्तर प्रदेश</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full">फिल्टर लागू करा</Button>
      </CardContent>
    </Card>
  );
}