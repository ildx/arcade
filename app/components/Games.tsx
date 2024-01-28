'use client';

import { clsx } from 'clsx';
import { useState } from 'react';

import { Game, Platform } from '@utils/getGames';

import { useSort } from '@hooks/useSort';

interface IProps {
  games: Game[];
}

export const Games = ({ games }: IProps) => {
  const [platform, setPlatform] = useState<Platform>();
  const [showPlatforms, setShowPlatforms] = useState(false);

  const {
    data: sortedGames,
    sortConfig,
    sort,
  } = useSort(
    games.filter((game) => {
      return !!platform
        ? JSON.stringify(game.platform) === JSON.stringify(platform)
        : games;
    }),
    {
      direction: 'asc',
      key: 'name',
    },
  );

  const platforms = Array.from(
    new Set(games.map((g) => JSON.stringify(g.platform))),
  ).map((p) => JSON.parse(p));

  const parsePlatformName = (p: Platform) => `${p.brand} ${p.console}`;

  const onSelectPlatform = (p: Platform | undefined) => {
    setPlatform(p);
    setShowPlatforms(false);
  };

  return (
    <>
      {/* Filter */}
      <section className="flex w-full max-w-4xl items-center justify-between">
        <div className="relative w-fit cursor-pointer">
          <div
            className="flex items-center rounded-lg border p-2"
            onClick={() => setShowPlatforms(!showPlatforms)}
          >
            <span className="px-4">Platform</span>
            <span className="p-2">|</span>
            <span className="px-4 text-arc-purple-hilight">
              {!platform ? 'All' : parsePlatformName(platform as Platform)}
            </span>
            <div
              className={clsx(
                showPlatforms ? 'arc-arrow-down' : 'arc-arrow-right',
              )}
            />
          </div>
          {showPlatforms && (
            <ul className="absolute mt-2 w-64 overflow-hidden rounded-lg border border-arc-beige bg-arc-beige text-arc-purple-dark">
              <li
                className="p-2 px-4 hover:bg-arc-purple-dark hover:text-arc-purple-hilight"
                onClick={() => onSelectPlatform(undefined)}
              >
                All
              </li>
              {platforms.map((p, index) => (
                <li
                  className="px-4 py-2 hover:bg-arc-purple-dark hover:text-arc-purple-hilight"
                  key={index}
                  onClick={() => onSelectPlatform(p)}
                >
                  {parsePlatformName(p)}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          Total games:{' '}
          <span className="text-arc-purple-hilight">{sortedGames.length}</span>
        </div>
      </section>

      {/* Games */}
      <section className="mt-4 w-full max-w-4xl">
        <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-lg border">
          <thead>
            <tr>
              <th
                className="w-6/12 border-b border-arc-beige px-4 py-2 text-left text-arc-purple-hilight"
                onClick={() => sort({ key: 'name' })}
              >
                Name
              </th>
              <th className="w-6/12 border-b border-arc-beige px-4 py-2 text-left text-arc-purple-hilight">
                Platform
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedGames.map((game, index) => (
              <tr
                key={index}
                className={clsx(index % 2 !== 0 && 'bg-arc-blue-dark')}
              >
                <td className="px-4 py-2">{game.name}</td>
                <td className="px-4 py-2">
                  {game.platform.brand} {game.platform.console}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};
