import { Game } from "@/types/game";

async function getGames(): Promise<Game[]> {
     // use router to call server api
    const res: Response = await fetch('http://localhost:3000/api/games');
    if (!res.ok) { throw new Error('Failed to fetch games') };

    // response is ok, so convert json to array of Game objects
    const games: Game[] = await res.json();
    return games;
}

export default async function Games() {
   // fetch data
   const games = await getGames();

   return (
        <main>
            <h1>Our Games</h1>
            <ul>
                {games.map((game) => (
                    <li key={game._id}>{game.title}</li>
                ))}
            </ul>
        </main>
   );
}