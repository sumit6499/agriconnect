"use client";

import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", price: 45 },
  { name: "Feb", price: 52 },
  { name: "Mar", price: 48 },
  { name: "Apr", price: 55 },
  { name: "May", price: 50 },
  { name: "Jun", price: 58 },
];

export function PriceChart() {
  return (
    <div className="h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}