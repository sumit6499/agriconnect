import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const inventory = [
  {
    id: "1",
    name: "Organic Tomatoes",
    quantity: 150,
    unit: "kg",
    status: "In Stock",
  },
  {
    id: "2",
    name: "Fresh Wheat",
    quantity: 50,
    unit: "kg",
    status: "Low Stock",
  },
  {
    id: "3",
    name: "Green Peas",
    quantity: 200,
    unit: "kg",
    status: "In Stock",
  },
];

export function ProductInventory() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inventory.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.quantity} {item.unit}</TableCell>
            <TableCell>{item.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}