'use client';

import { useContext } from 'react';

import { GameContext } from '@context/gameContext';

export const Total = () => {
  const { games } = useContext(GameContext);
  return (
    <div className="flex min-w-32 items-center justify-end">
      <span>Games:</span>
      <span className="ml-2 text-arc-purple-hilight">
        {games.data.length}/{games.count}
      </span>
    </div>
  );
};
