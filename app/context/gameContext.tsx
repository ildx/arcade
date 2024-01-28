'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

import type { Game, Platform } from '@utils/getGames';

import { useSort } from '@hooks/useSort';

interface IGameContext {
  count: number;
  data: Game[];
  pages: {
    count: number;
    current: number;
    onChange: (p: number) => void;
  };
}

interface IQueryContext {
  onQuery: (q: string) => void;
  value: string | undefined;
}

interface ISortContext {
  config: ReturnType<typeof useSort>['sortConfig'];
  onSort: ReturnType<typeof useSort>['sort'];
}

interface IWishlistContext {
  onSelect: (state: boolean) => void;
  value: boolean;
}

interface IPlatformContext {
  data: Platform[];
  getName: (p: Platform) => string;
  getSlug: (p: Platform) => string;
  onSelect: (p: Platform | undefined) => void;
  selected: Platform | undefined;
}

export const GameContext = createContext<{
  games: IGameContext;
  query: IQueryContext;
  platforms: IPlatformContext;
  sort: ISortContext;
  wishlist: IWishlistContext;
}>({
  games: {} as IGameContext,
  platforms: {} as IPlatformContext,
  query: {} as IQueryContext,
  sort: {} as ISortContext,
  wishlist: {} as IWishlistContext,
});

export const GameProvider = ({
  data,
  children,
}: {
  data: Game[];
  children: React.ReactNode;
}) => {
  const [query, setQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(0);
  const [platform, setPlatform] = useState<Platform>();
  const [wishlist, setWishlist] = useState(false);

  const filteredGames = filterGames(data, query, platform, wishlist);

  const {
    data: sortedGames,
    sort: sortGames,
    sortConfig,
  } = useSort(filteredGames, { direction: 'asc', key: 'name' });

  const paginatedGames = paginateGames(sortedGames);

  const platforms = filterPlatforms(data);

  return (
    <GameContext.Provider
      value={{
        games: {
          count: data.length,
          data: paginatedGames.data[currentPage] ?? [],
          pages: {
            count: paginatedGames.count,
            current: currentPage,
            onChange: (p: number) => setCurrentPage(p),
          },
        },
        platforms: {
          data: platforms,
          getName: getPlatformName,
          getSlug: getPlatformConsoleSlug,
          onSelect: (p: Platform | undefined) => {
            setPlatform(p);
            setCurrentPage(0);
          },
          selected: platform,
        },
        query: {
          onQuery: (q: string) => {
            setQuery(q);
            setCurrentPage(0);
          },
          value: query,
        },
        sort: {
          config: sortConfig,
          onSort: sortGames,
        },
        wishlist: {
          onSelect: (state: boolean) => {
            setWishlist(state);
            setCurrentPage(0);
          },
          value: wishlist,
        },
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const filterGames = (
  games: Game[],
  query: string | undefined,
  platform: Platform | undefined,
  wishlist: boolean,
) => {
  return games
    .filter((game) =>
      !query ? game : game.name.toLowerCase().includes(query.toLowerCase()),
    )
    .filter((game) => (!wishlist ? game : !game.owner))
    .filter((game) =>
      !platform
        ? game
        : JSON.stringify(game.platform) === JSON.stringify(platform),
    );
};

const paginateGames = (games: Game[]) => {
  const pageSize = 50;
  const pageCount = Math.ceil(games.length / pageSize);
  return {
    count: pageCount,
    data: Array.from({ length: pageCount }, (_, i) =>
      games.slice(i * pageSize, (i + 1) * pageSize),
    ),
  };
};

const filterPlatforms = (games: Game[]) => {
  return Array.from(new Set(games.map((g) => JSON.stringify(g.platform)))).map(
    (p) => JSON.parse(p) as Platform,
  );
};

const getPlatformName = (p: Platform) => `${p.brand} ${p.console}`;
const getPlatformConsoleSlug = (p: Platform) => {
  return p.console.toLowerCase().replace(' ', '-');
};
