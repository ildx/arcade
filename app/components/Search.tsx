'use client';

import { useContext } from 'react';

import { GameContext } from '@context/gameContext';

import { Icon } from '@components/Icon';

export const Search = () => {
  const { query } = useContext(GameContext);
  return (
    <div className="relative flex flex-grow">
      <input
        type="text"
        className="w-full rounded-lg border bg-arc-purple-dark px-4 py-2 text-arc-beige"
        value={query.value}
        placeholder="Search..."
        onChange={(e) => query.onQuery(e.currentTarget.value)}
      />
      {!!query.value && (
        <button
          type="button"
          onClick={() => query.onQuery('')}
          className="absolute right-4 top-1/2 -my-2 max-w-4 cursor-pointer"
        >
          <Icon.Close color="fill-arc-beige" />
        </button>
      )}
    </div>
  );
};
