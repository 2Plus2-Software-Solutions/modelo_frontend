import React, { ReactNode } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import LZString from "lz-string";

type TableHistoricItem = {
  href: string;
  label: string;
};

const TableHistoricContext = React.createContext<{
  breadcrumbItems: TableHistoricItem[];
  onNavigateToAnotherTable: (path: string) => void;
  onClickBreadcrumbItem: (itemIndex: number) => void;
  onChangeFilters: <
    TFilters extends {
      [key: string]: string;
    }
  >(
    newFilters: TFilters
  ) => void;
  initialFiltersFromUrl: {
    [k: string]: string;
  };
}>({
  breadcrumbItems: [],
  onNavigateToAnotherTable: () => {},
  onClickBreadcrumbItem: () => {},
  onChangeFilters: () => {},
  initialFiltersFromUrl: {},
});

export const TableHistoricProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { pathname, search } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentUrl = React.useMemo(() => {
    return `${pathname}${search}`;
  }, [pathname]);

  const [historicItems, setHistoricItems] = React.useState<TableHistoricItem[]>(
    []
  );

  const initialFiltersFromUrl = React.useMemo(() => {
    const copiedSearchParams = new URLSearchParams(searchParams);

    if (copiedSearchParams.get("historic")) {
      copiedSearchParams.delete("historic");
    }

    return Object.fromEntries(copiedSearchParams);
  }, [searchParams]);

  React.useEffect(() => {
    const currentPageBreadcrumbItem: TableHistoricItem = {
      href: currentUrl,
      label: pathname.split("/")[1],
    };

    if (!search) {
      setHistoricItems([currentPageBreadcrumbItem]);
    }

    const historicSearchItem = searchParams.get("historic");
    if (historicSearchItem) {
      const decompressedHistoricItems = JSON.parse(
        LZString.decompressFromEncodedURIComponent(historicSearchItem)
      );

      setHistoricItems([
        ...decompressedHistoricItems,
        currentPageBreadcrumbItem,
      ]);
      return;
    }

    setHistoricItems((prev) => {
      if (prev.length === 0) {
        return [currentPageBreadcrumbItem];
      }

      const currentPageBreadcrumbItemIndex = prev.findIndex(
        (item) => item.href === currentUrl
      );
      if (currentPageBreadcrumbItemIndex !== -1) {
        return prev.slice(0, currentPageBreadcrumbItemIndex + 1);
      }

      return [...prev, currentPageBreadcrumbItem];
    });
  }, [pathname]);

  function onNavigateToAnotherTable(path: string) {
    const stringifiedHistoricItems = JSON.stringify(historicItems);
    const compressedHistoricItems = LZString.compressToEncodedURIComponent(
      stringifiedHistoricItems
    );

    navigate(`${path}&historic=${compressedHistoricItems}`);
  }

  function onClickBreadcrumbItem(itemIndex: number) {
    const currentUrl = `${pathname}${search}`;
    const clickedBreadcrumbItem = historicItems[itemIndex];

    if (clickedBreadcrumbItem.href === currentUrl) return;

    navigate(clickedBreadcrumbItem.href);
  }

  function onChangeFilters<
    TFilters extends {
      [key: string]: string;
    }
  >(newFilters: TFilters) {
    const filtersAsSearchParams = new URLSearchParams(newFilters);
    const currentPathUrl = `${pathname}?${filtersAsSearchParams}`;

    if (historicItems.length === 0) {
      return;
    }

    setHistoricItems((prev) => {
      const { label } = prev.pop()!;

      return [
        ...prev,
        {
          href: currentPathUrl,
          label,
        },
      ];
    });

    setSearchParams(new URLSearchParams(newFilters));
  }

  return (
    <TableHistoricContext.Provider
      value={{
        breadcrumbItems: historicItems,
        onNavigateToAnotherTable,
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
