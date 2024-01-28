'use client';

import clsx from 'clsx';
import { useContext } from 'react';

import { GameContext } from '@context/gameContext';

export const Games = () => {
  const {
    sort: { sortConfig, sortGames },
    games,
  } = useContext(GameContext);
  return (
    <section className="mt-4 w-full max-w-4xl">
      <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-lg border">
        <thead>
          <tr>
            <th
              className="w-6/12 border-b border-arc-beige px-4 py-2 text-left text-arc-purple-hilight"
              onClick={() => sortGames({ key: 'name' })}
            >
              <div className="flex cursor-pointer items-center">
                Name
                <span
                  className={clsx(
                    'ml-2',
                    sortConfig.direction === 'asc'
                      ? 'arc-arrow-down'
                      : 'arc-arrow-up',
                  )}
                />
              </div>
            </th>
            <th className="w-6/12 border-b border-arc-beige px-4 py-2 text-left text-arc-purple-hilight">
              Platform
            </th>
          </tr>
        </thead>
        <tbody>
          {games.map((game, index) => (
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
  );
};
