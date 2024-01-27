'use client'

import { useState } from "react"
import { useSort } from "../hooks/useSort"
import type { Game } from "../lib/types"

interface IProps {
  games: Game[]
}

type Platform = Game['platform']

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
        : games
    }),
    {
      direction: 'asc',
      key: 'name',
    }
  );

  const platforms = Array
    .from(new Set(games.map((g) => JSON.stringify(g.platform))))
    .map((p) => JSON.parse(p));


  const parsePlatformName = (p: Platform) => `${p.brand} ${p.console}`;

  const onSelectPlatform = (p: Platform | undefined) => {
    setPlatform(p);
    setShowPlatforms(false);
  }

  return (
    <div>
      {/* Filter */}
      <div>
        <div onClick={() => setShowPlatforms(!showPlatforms)}>
          <span>Platform:</span>
          <span>
            {!platform ? 'All' : parsePlatformName(platform as Platform)}
          </span>
        </div>
        {showPlatforms && (
          <ul>
            <li onClick={() => onSelectPlatform(undefined)}>All</li>
            {platforms.map((p, index) => (
              <li
                key={index}
                onClick={() => onSelectPlatform(p)}
              >
                {parsePlatformName(p)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Games */}
      <div>
        <table>
        <thead>
          <tr>
            <th onClick={() => sort({ key: 'name' })}>Name</th>
            <th>Platform</th>
          </tr>
        </thead>
        <tbody>
          {sortedGames.map((game, index) => (
            <tr key={index}>
              <td>{game.name}</td>
              <td>{game.platform.brand} {game.platform.console}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  )
}
