import { Button } from "@/components/ui/button";
import { Column } from "@tanstack/react-table";
import { ArrowDown, ArrowUp } from "lucide-react";

interface SortableHeaderProps<TData> {
  column: Column<TData, unknown>;
  label: string;
}

export function SortableHeader<TData>({
  column,
  label,
}: SortableHeaderProps<TData>) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {label}
      {column.getIsSorted() === "asc" ? (
        <ArrowUp className="ml-2 h-4 w-4" />
      ) : (
        <ArrowDown className="ml-2 h-4 w-4" />
      )}
    </Button>
  );
}
