'use client';

import { Consoles } from '@components/Consoles';
import { Ownership } from '@components/Ownership';
import { Search } from '@components/Search';
import { Total } from '@components/Total';

export const Toolbar = () => (
  <section className="relative flex w-full max-w-5xl gap-4 py-4">
    <Search />
    <Consoles />
    <Ownership />
    <Total />
  </section>
);
