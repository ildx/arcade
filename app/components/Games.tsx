'use client';

import clsx from 'clsx';
import { useContext } from 'react';

import { GameContext } from '@context/gameContext';

import { Icon } from '@components/Icon';

export const Games = () => {
  const { games, sort } = useContext(GameContext);
  return (
    <section className="w-full max-w-5xl">
      <table className="w-full border-separate border-spacing-0 overflow-hidden rounded-lg border">
        <thead>
          <tr>
            <Table.Heading
              width="w-[55%]"
              onClick={() => sort.onSort({ key: 'name' })}
            >
              <div className="flex cursor-pointer items-center">
                Name
                <span
                  className={clsx(
                    'ml-2',
                    sort.config.direction === 'asc'
                      ? 'arc-arrow-down'
                      : 'arc-arrow-up',
                  )}
                />
              </div>
            </Table.Heading>
            <Table.Heading width="w-[30%]">Console</Table.Heading>
            <Table.Heading alignCenter width="w-[15%]">
              On a wishlist?
            </Table.Heading>
          </tr>
        </thead>
        <tbody>
          {!games.data.length ? (
            <tr>
              <td className="px-4 py-20 text-center" colSpan={3}>
                No results :(
              </td>
            </tr>
          ) : (
            games.data.map((game, index) => (
              <tr
                key={index}
                className={clsx(index % 2 !== 0 && 'bg-arc-blue-dark')}
              >
                <Table.Cell>{game.name}</Table.Cell>
                <Table.Cell>{game.platform.console}</Table.Cell>
                <Table.Cell alignCenter>
                  <div className="m-auto max-w-3">
                    {!game.owner && <Icon.Close color="fill-arc-beige" />}
                  </div>
                </Table.Cell>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
};

interface IHeadingProps {
  alignCenter?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  width: string;
}

const Heading = ({ alignCenter, children, onClick, width }: IHeadingProps) => (
  <th
    className={clsx(
      width,
      alignCenter && 'text-center',
      'border-b border-arc-beige px-4 py-2 text-left text-arc-purple-hilight',
    )}
    onClick={onClick}
  >
    {children}
  </th>
);

interface ICellProps {
  alignCenter?: boolean;
  children: React.ReactNode;
}

const Cell = ({ alignCenter, children }: ICellProps) => (
  <td className={clsx('px-4 py-2', alignCenter && 'text-center')}>
    {children}
  </td>
);

const Table = { Cell, Heading };
