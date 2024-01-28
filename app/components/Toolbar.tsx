'use client';

import { Consoles } from '@components/Consoles';
import { Ownership } from '@components/Ownership';
import { Search } from '@components/Search';
import { Total } from '@components/Total';

export const Toolbar = () => (
  <section className="relative flex w-full max-w-5xl flex-col gap-4 py-4 lg:flex-row">
    <div className="flex-grow">
      <Search />
    </div>
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="flex-grow">
        <Consoles />
      </div>
      <div className="flex-grow">
        <Ownership />
      </div>
      <div className="flex">
        <Total />
      </div>
    </div>
  </section>
);
