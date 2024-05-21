import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";

import { DataTable } from "@/components/data-table/data-table";
import { FakeFetch } from "@/lib/fake-fetch";

import { DefaultValues, Path, useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTablePagination } from "@/context/table-pagination.context";
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

interface BaseFiltersDef<TFilters> {
  accessorKey: Path<TFilters>;
  label: string;
}

interface InputFiltersDef<TFilters> extends BaseFiltersDef<TFilters> {
  inputType: "input";
  mask?: (value: string) => string;
}

interface SelectFiltersDef<TFilters> extends BaseFiltersDef<TFilters> {
  inputType: "select";
  selectOptions: { value: string; label: string }[];
}

export type FiltersDef<TFilters> =
  | InputFiltersDef<TFilters>
  | SelectFiltersDef<TFilters>;

interface DataTableProps<TData, TFilters> {
  columns: ColumnDef<TData>[];
  filters: FiltersDef<TFilters>[];
  title: string;
}

export function Table<TData extends {}, TFilters extends {}>({
  columns,
  filters: filtersDef,
  title,
}: DataTableProps<TData, TFilters>) {
  const { pagination } = useTablePagination();
  const {
    breadcrumbItems,
    onClickBreadcrumbItem,
    onChangeFilters,
    initialFiltersFromUrl,
  } = useTableHistoric();

  const memoizedDefaultFiltersObject = React.useMemo<TFilters>(() => {
    const defaultFilters = filtersDef.reduce((acc, curr) => {
      return {
        ...acc,
        [curr.accessorKey]: "",
      };
    }, {} as TFilters);

    return { ...defaultFilters, ...initialFiltersFromUrl };
  }, []);

  const filtersForm = useForm<TFilters>({
    defaultValues: memoizedDefaultFiltersObject as DefaultValues<TFilters>,
  });

  const [filters, setFilters] = useState<TFilters>(
    memoizedDefaultFiltersObject
  );

  function searchResults(values: TFilters) {
    setFilters(values);
  }

  function resetFilters() {
    filtersForm.reset();
  }

  // Data Table Definitions
  const memoizedColumns = React.useMemo<ColumnDef<TData>[]>(() => columns, []);
  const defaultData = React.useMemo(() => [], []);

  const { data } = useQuery({
    queryKey: ["data", pagination, filters],
    queryFn: () => FakeFetch<TData[], TFilters>(pagination, filters),
    placeholderData: keepPreviousData,
  });

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="font-bold text-xl">{title}</h1>

        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbItems.map((item, index) => {
              return (
                <React.Fragment key={item.href}>
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

      {/* Filters Component */}
      <Form {...filtersForm}>
        <form
          onSubmit={filtersForm.handleSubmit(searchResults)}
          className="space-y-8"
          onChange={() => {
            onChangeFilters(filtersForm.getValues());
          }}
        >
          {filtersDef.map((filter) => {
            return (
              <FormField
                key={React.useId()}
                control={filtersForm.control}
                name={filter.accessorKey}
                render={({ field }) => {
                  if (filter.inputType === "select") {
                    return (
                      <FormItem>
                        <FormLabel>{filter.label}</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder={filter.label} />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filter.selectOptions.map((option) => {
                              return (
                                <SelectItem
                                  key={React.useId()}
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
