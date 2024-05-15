import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

export default function PaymentsTable() {
  const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "a@example.com",
    },
    {
      id: "728ed522",
      amount: 100,
      status: "pending",
      email: "l@example.com",
    },
    {
      id: "728ed521",
      amount: 100,
      status: "pending",
      email: "c@example.com",
    },
    {
      id: "728ed523",
      amount: 100,
      status: "failed",
      email: "k@example.com",
    },
    {
      id: "728ed524",
      amount: 100,
      status: "pending",
      email: "e@example.com",
    },
  ];

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
