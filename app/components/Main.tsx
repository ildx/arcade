import { Games } from './Games';
import { Platforms } from './Platforms';

export const Main = () => (
  <main className="flex flex-col items-center p-6">
    <Platforms />
    <Games />
  </main>
);
