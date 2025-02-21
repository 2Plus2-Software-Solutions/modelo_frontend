import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect } from "react";

import { DataTable } from "@/components/data-table/data-table";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useTableHistoric } from "@/context/table-historic.context";
import { FiltersDef } from "./types";
import { queryClient } from "@/lib/queryClient";

interface TableProps<TData, TFilters> {
  title: string;
  columns: ColumnDef<TData>[];
  filters: FiltersDef<TFilters>[];
  fetchDataFn: (filters: TFilters) => Promise<TData[]>;
}

export function Table<
  TData extends object,
  TFilters extends {
    [key: string]: string;
  }
>({
  columns,
  filters: filtersDef,
  title,
  fetchDataFn,
}: TableProps<TData, TFilters>) {
  const { breadcrumbItems, onClickBreadcrumbItem, setFilters, filters } =
    useTableHistoric();

  const memoizedDefaultFiltersObject = React.useMemo<TFilters>(() => {
    return filtersDef.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.accessorKey]: "",
      };
    }, {} as TFilters);
  }, [filtersDef]);

  const filtersForm = useForm<TFilters>({
    values: {
      ...memoizedDefaultFiltersObject,
      ...filters,
    },
  });

  function resetFilters() {
    filtersForm.reset(memoizedDefaultFiltersObject);
  }

  // Data Table Definitions
  const memoizedColumns = React.useMemo<ColumnDef<TData>[]>(
    () => columns,
    [columns]
  );
  const defaultData = React.useMemo(() => [], []);

  const { data, refetch } = useQuery({
    queryKey: [`data-${title}`, filters],
    queryFn: () => fetchDataFn(filters as TFilters),
    placeholderData: keepPreviousData,
    enabled: Object.keys(filters).length !== 0,
  });

  function searchResults(values: TFilters) {
    console.log(values);
    setFilters({ ...values });

    setTimeout(() => {
      refetch();
    }, 0);
  }

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: [`data-${title}`],
      });
    };
  }, [title]);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="font-bold text-xl">{title}</h1>

        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => {
              return (
                <React.Fragment key={item.urlPathname}>
                  <BreadcrumbItem>
                    <BreadcrumbLink
                      className="cursor-pointer hover:underline"
                      onClick={() => onClickBreadcrumbItem(index)}
                    >
                      {item.label}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index !== breadcrumbItems.length - 1 && (
                    <BreadcrumbSeparator />
                  )}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <Form {...filtersForm}>
        <form
          onSubmit={filtersForm.handleSubmit(searchResults)}
          className="space-y-8"
        >
          {filtersDef.map((filter) => {
            return (
              <FormField
                key={filter.accessorKey}
                control={filtersForm.control}
                name={filter.accessorKey}
                render={({ field }) => {
                  if (filter.inputType === "select") {
                    return (
                      <FormItem>
                        <FormLabel>{filter.label}</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={filter.label} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {/* <SelectItem value="">Todos</SelectItem> */}
                            {filter.selectOptions.map((option) => {
                              return (
                                <SelectItem
                                  key={option.value}
                                  value={option.value}
                                >
                                  {option.label}
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    );
                  }

                  return (
                    <FormItem>
                      <FormLabel>{filter.label}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(event) =>
                            filter.mask
                              ? field.onChange(filter.mask(event.target.value))
                              : field.onChange(event)
                          }
                          placeholder={filter.label}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
            );
          })}

          <Button type="button" onClick={() => resetFilters()}>
            Limpar Filtros
          </Button>
          <Button className="ml-2" type="submit">
            Submit
          </Button>
        </form>
      </Form>

      <DataTable columns={memoizedColumns} data={data ?? defaultData} />
    </div>
  );
}
