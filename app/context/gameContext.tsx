'use client';

import {
  Dispatch,
  SetStateAction,
  createContext,
  useMemo,
  useState,
} from 'react';

import { Game, Platform } from '@utils/getGames';

import { useSort } from '@hooks/useSort';

interface IGameContext {
  data: Game[];
  pages: {
    count: number;
    current: number;
    onChange: (p: number) => void;
  };
}

interface IQueryContext {
  onQuery: Dispatch<SetStateAction<string>>;
  value: string | undefined;
}

interface ISortContext {
  config: ReturnType<typeof useSort>['sortConfig'];
  onSort: ReturnType<typeof useSort>['sort'];
}

export const GameContext = createContext<{
  games: IGameContext;
  query: IQueryContext;
  sort: ISortContext;
}>({
  games: {} as IGameContext,
  query: {} as IQueryContext,
  sort: {} as ISortContext,
});

export const GameProvider = ({
  data,
  children,
}: {
  data: Game[];
  children: React.ReactNode;
}) => {
  const [query, setQuery] = useState<string>('');
  // const [platform, setPlatform] = useState<Platform>();
  const [currentPage, setCurrentPage] = useState(0);

  const filteredGames = filterGames(data, query);

  const {
    data: sortedGames,
    sort: sortGames,
    sortConfig,
  } = useSort(filteredGames, { direction: 'asc', key: 'name' });

  const paginatedGames = paginateGames(sortedGames);
  // const platforms = filterPlatforms(data);

  // const queryObject = { set: setQuery, value: query };

  return (
    <GameContext.Provider
      value={{
        games: {
          data: paginatedGames.data[currentPage] ?? [],
          pages: {
            count: paginatedGames.count,
            current: currentPage,
            onChange: (p: number) => setCurrentPage(p),
          },
        },
        query: {
          onQuery: setQuery,
          value: query,
        },
        sort: {
          config: sortConfig,
          onSort: sortGames,
        },
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

const filterGames = (games: Game[], query: string | undefined) => {
  return games.filter((game) => (!query ? game : game.name.includes(query)));
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

// const filterGames = (games: Game[], platform: Platform | undefined) => {
//   return games.filter((game) =>
//     !platform
//       ? game
//       : JSON.stringify(game.platform) === JSON.stringify(platform),
//   );
// };

const filterPlatforms = (games: Game[]) => {
  return Array.from(new Set(games.map((g) => JSON.stringify(g.platform)))).map(
    (p) => JSON.parse(p),
  );
};

const getPlatformName = (p: Platform) => `${p.brand} ${p.console}`;
