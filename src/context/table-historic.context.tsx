import React, { ReactNode } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import LZString from "lz-string";
import { CleanObjectEmptyValues } from "@/lib/clean-object-empty-values";

type TableHistoricItem = {
  urlPathname: string;
  urlSearchParams: string;
  label: string;
};

const TableHistoricContext = React.createContext<{
  breadcrumbItems: TableHistoricItem[];
  onNavigateToAnotherTable: (path: string) => void;
  onClickBreadcrumbItem: (itemIndex: number) => void;
  setFilters: <
    TFilters extends {
      [key: string]: string;
    }
  >(
    newFilters: TFilters
  ) => void;
  filters: {
    [k: string]: string;
  };
}>({
  breadcrumbItems: [],
  onNavigateToAnotherTable: () => {},
  onClickBreadcrumbItem: () => {},
  setFilters: () => {},
  filters: {},
});

export const TableHistoricProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchParams] = useSearchParams();
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const [historicItems, setHistoricItems] = React.useState<TableHistoricItem[]>(
    []
  );

  React.useEffect(() => {
    const currentPageBreadcrumbItem: TableHistoricItem = {
      urlPathname: pathname,
      urlSearchParams: search,
      label: pathname.split("/")[1],
    };

    if (!currentPageBreadcrumbItem.urlSearchParams) {
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
      const breadcrumbItemIndex = prev.findIndex(
        (item) => item.urlPathname === currentPageBreadcrumbItem.urlPathname
      );

      if (breadcrumbItemIndex !== -1) {
        return [
          ...prev.slice(0, breadcrumbItemIndex),
          currentPageBreadcrumbItem,
        ];
      }

      return [...prev, currentPageBreadcrumbItem];
    });
  }, [pathname, search, searchParams]);

  function onNavigateToAnotherTable(path: string) {
    const stringifiedHistoricItems = JSON.stringify(historicItems);
    const compressedHistoricItems = LZString.compressToEncodedURIComponent(
      stringifiedHistoricItems
    );

    navigate(`${path}&historic=${compressedHistoricItems}`);
  }

  function onClickBreadcrumbItem(itemIndex: number) {
    const clickedBreadcrumbItem = historicItems[itemIndex];

    if (clickedBreadcrumbItem.urlPathname === pathname) return;

    navigate(
      `${clickedBreadcrumbItem.urlPathname}${clickedBreadcrumbItem.urlSearchParams}`
    );
  }

  function onChangeFilters<
    TFilters extends {
      [key: string]: string;
    }
  >(newFilters: TFilters) {
    const filtersAsSearchParams = new URLSearchParams({
      ...Object.fromEntries(searchParams),
      ...CleanObjectEmptyValues(newFilters),
    });

    navigate(`${pathname}?${filtersAsSearchParams}`, {
      replace: true,
    });
  }

  return (
    <TableHistoricContext.Provider
      value={{
        breadcrumbItems: historicItems,
        onNavigateToAnotherTable,
        onClickBreadcrumbItem,
        setFilters: onChangeFilters,
        filters: Object.fromEntries(searchParams),
      }}
    >
      {children}
    </TableHistoricContext.Provider>
  );
};

export const useTableHistoric = () => {
  return React.useContext(TableHistoricContext);
};
