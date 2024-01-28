import { Games } from '@components/Games';
import { Pagination } from '@components/Pagination';
import { Toolbar } from '@components/Toolbar';

export const Main = () => (
  <main className="flex flex-col items-center">
    <Toolbar />
    <Games />
    <Pagination />
  </main>
);
