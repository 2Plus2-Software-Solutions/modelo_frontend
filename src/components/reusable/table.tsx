import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";

import { DataTable } from "@/components/data-table/data-table";
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
type FormType = z.infer<typeof formSchema>;

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
}

export function Table<TData>({ columns }: DataTableProps<TData>) {
  const memoizedDefaultFiltersObjectFromZodSchema = React.useMemo<FormType>(
    () => GetDefaultObjectFromZodSchema(formSchema),
    []
  );

  const { pagination } = usePagination();

  const [filters, setFilters] = useState<FormType>(
    memoizedDefaultFiltersObjectFromZodSchema
  );

  const form = useForm<FormType>({
    resolver: zodResolver(formSchema),
    defaultValues: memoizedDefaultFiltersObjectFromZodSchema,
  });

  function searchResults(values: FormType) {
    setFilters(values);
  }

  function resetFilters() {
    form.reset();
  }

  const memoizedColumns = React.useMemo<ColumnDef<TData>[]>(() => columns, []);
  const defaultData = React.useMemo(() => [], []);

  const { data } = useQuery({
    queryKey: ["data", pagination, filters],
    queryFn: () => FakeFetch<TData[], FormType>(pagination, filters),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="container mx-auto py-10">
      {/* Filters Component */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(searchResults)} className="space-y-8">
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

          <Button type="button" onClick={() => resetFilters()}>
            Limpar Filtros
          </Button>
          <Button type="submit">Submit</Button>
        </form>
      </Form>

      <DataTable columns={memoizedColumns} data={data ?? defaultData} />
    </div>
  );
}
