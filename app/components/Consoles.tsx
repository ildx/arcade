'use client';

import { useContext } from 'react';

import { GameContext } from '@context/gameContext';

import { Platform } from '@utils/getGames';

import { Dropdown, Option } from '@components/Dropdown';

export const Consoles = () => {
  const { platforms } = useContext(GameContext);

  const options = [
    {
      label: 'All consoles',
      value: '*',
    },
    ...platforms.data.map((platform) => {
      return {
        label: platform.console,
        value: platforms.getSlug(platform),
      };
    }),
  ];

  const onSelect = (option: Option) => {
    platforms.onSelect(
      option.value === '*'
        ? undefined
        : platforms.data.find((p) => platforms.getSlug(p) === option.value),
    );
  };

  const selectedOption = !platforms.selected
    ? options[0]
    : (options.find((option) => {
        return (
          option.value === platforms.getSlug(platforms.selected as Platform)
        );
      }) as Option);

  return (
    <Dropdown
      maxWidth="w-40"
      onChange={onSelect}
      options={options}
      selectedOption={selectedOption}
    />
  );
};
