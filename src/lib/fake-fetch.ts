import { PaginationState } from "@tanstack/react-table";

export const FakeFetch = async <TData, TForm>(
  pagination: PaginationState,
  filters: TForm
): Promise<TData> => {
  console.log("Fetch");
  console.log(pagination);
  console.log(filters);
  return [
    {
      id: "1",
      amount: 100,
      status: "pending",
      email: "a@example.com",
    },
    {
      id: "2",
      amount: 100,
      status: "pending",
      email: "l@example.com",
    },
    {
      id: "3",
      amount: 100,
      status: "pending",
      email: "c@example.com",
    },
    {
      id: "4",
      amount: 100,
      status: "failed",
      email: "k@example.com",
    },
    {
      id: "5",
      amount: 100,
      status: "pending",
      email: "e@example.com",
    },
  ] as TData;
};
