import { Pagination } from './Pagination';

import { Games } from '@components/Games';

export const Main = () => (
  <main className="flex flex-col items-center">
    <Games />
    <Pagination />
  </main>
);
