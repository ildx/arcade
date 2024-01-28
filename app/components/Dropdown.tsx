'use client';

import clsx from 'clsx';
import { useState } from 'react';

export type Option = Record<'label' | 'value', string>;

interface IDropdownProws {
  onChange: (option: Option) => void;
  options: Option[];
  selectedOption: Option;
}

export const Dropdown = ({
  onChange,
  options,
  selectedOption,
}: IDropdownProws) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const onSelect = (option: Option) => {
    setShowDropdown(false);
    onChange(option);
  };

  return (
    <section className="flex w-full max-w-4xl items-center justify-between">
      <div className="relative w-fit cursor-pointer">
        <button
          className="flex items-center rounded-lg border p-2"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <span className="px-4">{selectedOption.label}</span>
          <div
            className={clsx(
              'mr-2',
              showDropdown ? 'arc-arrow-down' : 'arc-arrow-right',
            )}
          />
        </button>
        {showDropdown && (
          <ul className="absolute mt-2 w-64 overflow-hidden rounded-lg border border-arc-beige bg-arc-beige text-arc-purple-dark">
            {options.map((option, index) => (
              <li key={index}>
                <button
                  className="w-full px-4 py-2 text-left hover:bg-arc-purple-dark hover:text-arc-purple-hilight"
                  onClick={() => onSelect(option)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
