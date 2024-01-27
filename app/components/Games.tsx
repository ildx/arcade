'use client'

import { clsx } from "clsx"
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
    <>
      {/* Filter */}
      <section className="w-full max-w-4xl flex items-center justify-between">
        <div className="w-fit relative cursor-pointer">
          <div className="border rounded-lg p-2" onClick={() => setShowPlatforms(!showPlatforms)}>
            <span className="px-4">Platform</span>
            <span className="p-2">|</span>
            <span className="px-4 text-purple-hilight">
              {!platform ? 'All' : parsePlatformName(platform as Platform)}
            </span>
          </div>
          {showPlatforms && (
            <ul className="absolute mt-2 border rounded-lg bg-beige text-purple-dark w-64 border-beige overflow-hidden">
              <li className="p-2 px-4 hover:bg-purple-dark hover:text-purple-hilight" onClick={() => onSelectPlatform(undefined)}>All</li>
              {platforms.map((p, index) => (
                <li
                  className="py-2 px-4 hover:bg-purple-dark hover:text-purple-hilight"
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
          Total games: <span className="text-purple-hilight">{sortedGames.length}</span>
        </div>
      </section>

      {/* Games */}
      <section className="w-full max-w-4xl mt-4">
        <table className="w-full border rounded-lg border-separate border-spacing-0 overflow-hidden">
        <thead>
          <tr>
            <th
              className="border-b border-beige text-left py-2 px-4 text-purple-hilight w-6/12"
              onClick={() => sort({ key: 'name' })}
            >
                Name
            </th>
            <th className="border-b border-beige text-left py-2 px-4 text-purple-hilight w-6/12">Platform</th>
          </tr>
        </thead>
        <tbody>
          {sortedGames.map((game, index) => (
            <tr
              key={index}
              className={
                clsx(index % 2 !== 0 && 'bg-blue-dark')
              }
            >
              <td className="py-2 px-4">{game.name}</td>
              <td className="py-2 px-4">{game.platform.brand} {game.platform.console}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </section>
    </>
  )
}
