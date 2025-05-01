"use client";

import { useState, useEffect } from "react";
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export function PriceChart() {
  // Initial data with months and prices
  const [data, setData] = useState([
    { name: "Jan", price: 45 },
    { name: "Feb", price: 52 },
    { name: "Mar", price: 48 },
    { name: "Apr", price: 55 },
    { name: "May", price: 50 },
    { name: "Jun", price: 58 },
  ]);

  // Simulate the addition of new data and removal of the oldest month
  useEffect(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let currentIndex = data.length; // Start after the initial data

    const interval = setInterval(() => {
      // Cycle to the next month and remove the first (oldest) month if necessary
      const nextMonth = months[currentIndex % months.length];
      const newPrice = Math.floor(Math.random() * 100) + 40; // Generate random price

      setData((prevData) => {
        const updatedData = [...prevData.slice(1), { name: nextMonth, price: newPrice }];
        currentIndex++;
        return updatedData;
      });
    }, 5000); // Every 5 seconds add a new month and remove the oldest one

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [data.length]);

  return (
    <div className="h-[300px] mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', color: '#fff' }} />
          <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
