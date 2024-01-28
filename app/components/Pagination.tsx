'use client';

import clsx from 'clsx';
import { useContext, Fragment } from 'react';

import { GameContext } from '@context/gameContext';

export const Pagination = () => {
  const {
    games: { pages },
  } = useContext(GameContext);

  if (!pages.count) return null;

  return (
    <section className="mt-4 flex max-w-5xl rounded-lg border">
      {Array.from({ length: pages.count }, (_, page) => (
        <Fragment key={page}>
          <button
            className={clsx(
              'p-4',
              pages.current === page && 'text-arc-purple-hilight',
            )}
            onClick={() => pages.onChange(page)}
          >
            {page + 1}
          </button>
          {page + 1 !== pages.count && <span className="px-2 py-4">|</span>}
        </Fragment>
      ))}
    </section>
  );
};
