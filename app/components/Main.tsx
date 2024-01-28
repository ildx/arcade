import { Pagination } from './Pagination';
import { Search } from './Search';

import { Games } from '@components/Games';

export const Main = () => (
  <main className="flex flex-col items-center">
    <Search />
    <Games />
    <Pagination />
  </main>
);
