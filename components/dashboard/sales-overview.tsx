"use client";

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Vegetables", sales: 4000 },
  { name: "Fruits", sales: 3000 },
  { name: "Grains", sales: 2000 },
  { name: "Pulses", sales: 2780 },
];

export function SalesOverview() {
  return (
    <div className="h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#fff', borderRadius: '5px' }}
            labelStyle={{ fontWeight: 'bold' }}
            itemStyle={{ color: '#fff' }}
          />
          <Bar dataKey="sales" fill="hsl(var(--primary))" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
