import React, { ReactNode } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

export type TableNavigationState = {
  origin: "breadcrumb" | "payments" | "users";
  identifier?: string;
  targetFilterAccessorKey?: string;
};

type TableBreadcrumbItem = {
  href: string;
  label: string;
};

// Context para lidar com o histórico de navegação entre as tabelas
// Histórico de filtros e de páginas (breadcrumb)
const TableHistoricContext = React.createContext<{
  breadcrumbItems: TableBreadcrumbItem[];
  onClickBreadcrumbItem: (itemIndex: number) => void;
  onChangeFilters: <TFilters extends {}>(newFilters: TFilters) => void;
  initialFiltersFromUrl: {
    [k: string]: string;
  };
}>({
  breadcrumbItems: [],
  onClickBreadcrumbItem: (_) => {},
  onChangeFilters: (_) => {},
  initialFiltersFromUrl: {},
});

export const TableHistoricProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { pathname, state } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const initialFiltersFromUrl = React.useMemo(() => {
    const typedState = state as TableNavigationState;
    console.log(typedState);

    if (
      !typedState ||
      !typedState.targetFilterAccessorKey ||
      typedState.origin === "breadcrumb"
    ) {
      return Object.fromEntries(searchParams);
    }

    return {
      ...Object.fromEntries(searchParams),
      [typedState.targetFilterAccessorKey]: typedState.identifier ?? "",
    };
  }, [pathname]);

  const [filtersItems, setFiltersItems] = React.useState<
    { [key: string]: string }[]
  >([]);

  const [breadcrumbItems, setBreadcrumbItems] = React.useState<
    TableBreadcrumbItem[]
  >([]);

  React.useEffect(() => {
    const currentPageBreadcrumbItem: TableBreadcrumbItem = {
      href: pathname,
      label: pathname,
    };

    const typedState = state as TableNavigationState;

    if (!typedState) {
      setBreadcrumbItems([currentPageBreadcrumbItem]);
      return;
    }

    if (typedState.origin === "breadcrumb") {
      setBreadcrumbItems((prev) => {
        if (prev.length === 0) {
          return [currentPageBreadcrumbItem];
        }

        const currentPageIndex = prev.findIndex(
          (item) => item.href === pathname
        );

        return prev.slice(0, currentPageIndex + 1);
      });
    }

    setBreadcrumbItems((prev) => {
      if (prev.find((item) => item.href === pathname)) {
        return [...prev];
      }

      return [...prev, currentPageBreadcrumbItem];
    });
  }, [pathname]);

  function onClickBreadcrumbItem(itemIndex: number) {
    const clickedBreadcrumbItem = breadcrumbItems[itemIndex];

    if (clickedBreadcrumbItem.href === pathname) return;

    navigate(clickedBreadcrumbItem.href, {
      state: {
        origin: "breadcrumb",
      } as TableNavigationState,
      replace: true,
    });
  }

  function onChangeFilters<TFilters extends {}>(newFilters: TFilters) {
    setFiltersItems((prev) => {
      if (prev.length === 0) {
        return [newFilters];
      }

      prev.pop();
      return [...prev, newFilters];
    });

    setSearchParams(new URLSearchParams(newFilters));
  }

  return (
    <TableHistoricContext.Provider
      value={{
        breadcrumbItems,
        onClickBreadcrumbItem,
        onChangeFilters,
        initialFiltersFromUrl,
      }}
    >
      {children}
    </TableHistoricContext.Provider>
  );
};

export const useTableHistoric = () => {
  return React.useContext(TableHistoricContext);
};
