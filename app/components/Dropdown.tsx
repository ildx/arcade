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
    <div className="relative min-w-48 cursor-pointer">
      <button
        className="flex w-full items-center justify-between rounded-lg border p-2"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span className="px-4">{selectedOption.label}</span>
        <div className="w-4">
          <div
            className={clsx(
              'm-auto',
              showDropdown ? 'arc-arrow-down' : 'arc-arrow-right',
            )}
          />
        </div>
      </button>
      {showDropdown && (
        <ul className="absolute z-50 mt-2 w-full overflow-hidden rounded-lg border border-arc-beige bg-arc-beige text-arc-purple-dark">
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
  );
};
