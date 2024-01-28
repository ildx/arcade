'use client';

import { useContext } from 'react';

import { GameContext } from '@context/gameContext';

import { Dropdown, Option } from '@components/Dropdown';

export const Ownership = () => {
  const { wishlist } = useContext(GameContext);

  const options: Option[] = [
    {
      label: 'In collection',
      value: 'collection',
    },
    {
      label: 'On the wishlist',
      value: 'wishlist',
    },
  ];

  const onSelect = (option: Option) => {
    wishlist.onSelect(option.value === 'wishlist');
  };

  const selectedOption = options[+wishlist.value];

  return (
    <Dropdown
      onChange={onSelect}
      options={options}
      selectedOption={selectedOption}
    />
  );
};
