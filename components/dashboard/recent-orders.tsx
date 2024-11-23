import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const recentOrders = [
  {
    id: "1",
    product: "Organic Tomatoes",
    customer: "John Doe",
    status: "Delivered",
    amount: "₹1,200",
  },
  {
    id: "2",
    product: "Fresh Wheat",
    customer: "Jane Smith",
    status: "Processing",
    amount: "₹2,400",
  },
  {
    id: "3",
    product: "Green Peas",
    customer: "Mike Johnson",
    status: "Shipped",
    amount: "₹800",
  },
];

export function RecentOrders() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentOrders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.product}</TableCell>
            <TableCell>{order.customer}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell className="text-right">{order.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}