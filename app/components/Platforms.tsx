'use client';

import clsx from 'clsx';
import { useContext, useState } from 'react';

import { GameContext } from '../context/gameContext';

import { Platform } from '../utils/getGames';

export const Platforms = () => {
  const [showPlatforms, setShowPlatforms] = useState(false);

  const {
    actions: { getPlatformName, setPlatform },
    games,
    platform,
    platforms,
  } = useContext(GameContext);

  const onSelectPlatform = (platform: Platform | undefined) => {
    setPlatform(platform);
    setShowPlatforms(false);
  };

  return (
    <section className="flex w-full max-w-4xl items-center justify-between">
      <div className="relative w-fit cursor-pointer">
        <div
          className="flex items-center rounded-lg border p-2"
          onClick={() => setShowPlatforms(!showPlatforms)}
        >
          <span className="px-4">Platform</span>
          <span className="px-2">|</span>
          <span className="px-4 text-arc-purple-hilight">
            {!platform ? 'All' : getPlatformName(platform)}
          </span>
          <div
            className={clsx(showPlatforms ? 'arc-arrow-down' : 'arc-arrow-up')}
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
                {getPlatformName(p)}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        Total games:{' '}
        <span className="text-arc-purple-hilight">{games.length}</span>
      </div>
    </section>
  );
};
