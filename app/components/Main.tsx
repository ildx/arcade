import { Games } from '@components/Games';
import { Search } from '@components/Search';

export const Main = () => (
  <main className="flex flex-col items-center">
    <Search />
    <Games />
  </main>
);
