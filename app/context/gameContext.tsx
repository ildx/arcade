'use client';

import { Dispatch, SetStateAction, createContext, useState } from 'react';

import { Game, Platform } from '@utils/getGames';

import { useSort } from '@hooks/useSort';

interface IActions {
  getPlatformName: (p: Platform) => string;
  setPlatform: Dispatch<SetStateAction<Platform | undefined>>;
}

interface ISort {
  sortConfig: ReturnType<typeof useSort>['sortConfig'];
  sortGames: ReturnType<typeof useSort>['sort'];
}

interface IQuery {
  set: Dispatch<SetStateAction<string>>;
  value: string | undefined;
}

interface IContext {
  actions: IActions;
  games: Game[];
  platform: Platform | undefined;
  platforms: Platform[];
  query: IQuery;
  sort: ISort;
}

export const GameContext = createContext<IContext>({
  actions: {} as IActions,
  games: [],
  platform: undefined,
  platforms: [],
  query: {} as IQuery,
  sort: {} as ISort,
});

export const GameProvider = ({
  data,
  children,
}: {
  data: Game[];
  children: React.ReactNode;
}) => {
  const [query, setQuery] = useState<string>('');
  const [platform, setPlatform] = useState<Platform>();

  const {
    data: games,
    sort: sortGames,
    sortConfig,
  } = useSort(filterGames(data, query), {
    direction: 'asc',
    key: 'name',
  });

  const platforms = filterPlatforms(games);

  const queryObject = { set: setQuery, value: query };

  return (
    <GameContext.Provider
      value={{
        actions: {
          getPlatformName,
          setPlatform,
        },
        games,
        platform,
        platforms,
        query: queryObject,
        sort: {
          sortConfig,
          sortGames,
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
