import { Button } from "@/components/ui/button";
import { TableNavigationState } from "@/context/table-historic.context";
import { useNavigate } from "react-router-dom";

interface NavigationCellProps extends TableNavigationState {}

export function NavigationCell({
  origin,
  identifier,
  targetFilterAccessorKey,
}: NavigationCellProps) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => {
        navigate("/payments", {
          state: {
            origin,
            identifier,
            targetFilterAccessorKey,
          } as TableNavigationState,
        });
      }}
    >
      Pagamentos
    </Button>
  );
}
