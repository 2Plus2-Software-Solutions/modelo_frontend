import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import React from "react";

import { DataTable } from "@/components/reusable/data-table";
import { FakeFetch } from "@/lib/fake-fetch";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { GetDefaultObjectFromZodSchema } from "@/lib/default-object-from-zod-schema";
import { usePagination } from "@/context/table-pagination.context";

const formSchema = z.object({
  username: z.string().optional(),
  age: z.number().optional(),
});

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
}

export function Table<TData>({ columns }: DataTableProps<TData>) {
  const { pagination } = usePagination();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: GetDefaultObjectFromZodSchema(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log(form.getValues());
    form.reset();
  }

  const memoizedColumns = React.useMemo<ColumnDef<TData>[]>(() => columns, []);
  const defaultData = React.useMemo(() => [], []);

  const { data } = useQuery({
    queryKey: ["data", pagination],
    queryFn: () => FakeFetch<TData[], PaginationState>(pagination),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  });

  return (
    <div className="container mx-auto py-10">
      {/* Filters Component */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Idade</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Idade"
                    {...field}
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <DataTable columns={memoizedColumns} data={data ?? defaultData} />
    </div>
  );
}
