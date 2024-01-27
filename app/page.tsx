import { Games } from "./components/Games";
import { Header } from "./components/Header";
import { getGames } from "./lib/getGames";

export default async function Page() {
  const games = await getGames(); 
  return (
    <>
      <Header />
      <main className="flex flex-col items-center p-6">
        <Games games={games} />
      </main>
    </>
  );
}