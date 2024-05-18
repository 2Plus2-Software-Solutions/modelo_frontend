import { PaginationState } from "@tanstack/react-table";

export const FakeFetch = async <TData, TForm>(
  pagination: PaginationState,
  filters: TForm
): Promise<TData> => {
  console.log(pagination);
  console.log(filters);
  return [
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
  ] as TData;
};
