'use client';

import { useContext } from 'react';

import { GameContext } from '@context/gameContext';

export const Total = () => {
  const { games } = useContext(GameContext);
  return (
    <div className="flex items-center px-4">
      <span>Games:</span>
      <span className="ml-2 text-arc-purple-hilight">
        {games.data.length}/{games.count}
      </span>
    </div>
  );
};
