import { render, screen } from "@testing-library/react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { createOrderColumns } from "@/features/orders/columns";
import type { Order } from "@/shared/api/types";

const order: Order = {
  id: 7,
  store_id: 1,
  order_number: "ORD-1-ABC",
  customer_name: "Karim",
  customer_phone: "01712345678",
  customer_address: "Dhaka",
  note: null,
  status: "pending",
  payment_method: "cod",
  payment_status: "unpaid",
  subtotal: 2500,
  total: 2500,
  created_at: "2026-10-29T03:14:07.123Z",
  updated_at: "2026-10-29T03:14:07.123Z",
};

function OrdersTable() {
  const table = useReactTable({
    data: [order],
    columns: createOrderColumns({ onView: () => undefined }),
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <table>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

test("the date column shows a readable date, not the raw ISO timestamp", () => {
  render(<OrdersTable />);
  expect(screen.queryByText(order.created_at)).not.toBeInTheDocument();
  expect(screen.getByText(new Date(order.created_at).toLocaleString())).toBeInTheDocument();
});

test("status is shown as a label and the total as money", () => {
  render(<OrdersTable />);
  expect(screen.getByText("Pending")).toBeInTheDocument();
  expect(screen.getByText("৳2,500")).toBeInTheDocument();
});
