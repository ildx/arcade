import naturalCompare from "natural-compare-lite";
import { useMemo, useState } from "react";

type SortDirection = "asc" | "desc";

interface ISortProps {
  key: string;
  direction?: SortDirection;
}

export interface ISortConfig<T = Record<string, any>> {
  caseSensitive?: boolean;
  direction: SortDirection;
  key: string & keyof T;
}

export const useSort = <T extends Record<string, any>>(
  data: T[],
  config: ISortConfig
) => {
  const [sortConfig, setSortConfig] = useState(config);

  const sortedData = useMemo(() => {
    const items = [...data].sort(
      naturalSorter(sortConfig.key, sortConfig.caseSensitive)
    );
    return sortConfig.direction === "asc" ? items : items.reverse();
  }, [data, sortConfig]);

  const setDirection = ({ key, direction }: ISortProps) => {
    return (
      direction ||
      (sortConfig.key === key
        ? sortConfig.direction === "asc"
          ? "desc"
          : "asc"
        : "asc")
    );
  };

  return {
    data: sortedData,
    sort: (props: ISortProps) => {
      setSortConfig({
        direction: setDirection(props),
        key: props.key,
      });
    },
    sortConfig,
  };
};

// @ts-ignore
export const naturalSorter = (key: string, sensitive?: boolean) => (a, b) => {
  const av = a[key];
  const bv = b[key];

  if (typeof av === "string" && typeof bv === "string") {
    if (sensitive) {
      return naturalCompare(av, bv);
    }
    return naturalCompare(av.toLowerCase(), bv.toLowerCase());
  }

  if (av > bv) return 1;
  if (bv > av) return -1;
  return 0;
};
