import { Button } from "@/components/ui/button";
import { useTableHistoric } from "@/context/table-historic.context";

interface NavigationCellProps {
  to: string;
  identifier: string;
  targetFilterAccessorKey: string;
}

export function NavigationCell({
  to,
  identifier,
  targetFilterAccessorKey,
}: NavigationCellProps) {
  const { onNavigateToAnotherTable } = useTableHistoric();

  return (
    <Button
      onClick={() => {
        onNavigateToAnotherTable(
          `${to}?${targetFilterAccessorKey}=${identifier}`
        );
      }}
    >
      Pagamentos
    </Button>
  );
}
