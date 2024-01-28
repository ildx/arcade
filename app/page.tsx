import { GameProvider } from '@context/gameContext';

import { getGames } from '@utils/getGames';

import { Footer } from './components/Footer';
import { Main } from '@/app/components/Main';
import { Header } from '@components/Header';

export default async function Page() {
  return (
    <GameProvider data={await getGames()}>
      <Header />
      <Main />
      <Footer />
    </GameProvider>
  );
}
