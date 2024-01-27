import { Games } from "./components/Games";
import { getGames } from "./lib/getGames";

export default async function Page() {
  const games = await getGames(); 
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>This is DAH PAGE!</h1>
      <Games games={games} />
    </main>
  );
}