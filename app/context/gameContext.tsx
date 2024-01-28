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

interface IContext {
  actions: IActions;
  games: Game[];
  platform: Platform | undefined;
  platforms: Platform[];
  sort: ISort;
}

export const GameContext = createContext<IContext>({
  actions: {} as IActions,
  games: [],
  platform: undefined,
  platforms: [],
  sort: {} as ISort,
});

export const GameProvider = ({
  data,
  children,
}: {
  data: Game[];
  children: React.ReactNode;
}) => {
  const [platform, setPlatform] = useState<Platform>();

  const {
    data: games,
    sort: sortGames,
    sortConfig,
  } = useSort(filterGames(data, platform), {
    direction: 'asc',
    key: 'name',
  });

  const platforms = filterPlatforms(games);

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

const filterGames = (games: Game[], platform: Platform | undefined) => {
  return games.filter((game) =>
    !platform
      ? game
      : JSON.stringify(game.platform) === JSON.stringify(platform),
  );
};

const filterPlatforms = (games: Game[]) => {
  return Array.from(new Set(games.map((g) => JSON.stringify(g.platform)))).map(
    (p) => JSON.parse(p),
  );
};

const getPlatformName = (p: Platform) => `${p.brand} ${p.console}`;
