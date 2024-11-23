import Link from "next/link";
import RemoveBtn from "./RemoveBtn";


interface Player {
    _id: string;
    player: string;
    goals: number;
    matchs: number;
}

const getPlayers = async (): Promise<Player[]> => {
  try {
    const res = await fetch("http://localhost:3000/api/players", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch players");
    }

    const data = await res.json();

    if (data && Array.isArray(data.players)) {
        return data.players;
      } else {
        console.error("La respuesta no tiene la propiedad 'players' o no es un array", data);
        return [];
      }
  } catch (error) {
    console.log("Error loading players", error);
    return [];
  }
};

export default async function PlayersList() {
  const players = await getPlayers();

  if (!Array.isArray(players) || players.length === 0) {
    return (
      <div className="text-center">
        <h2>No players found</h2>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded mb-10 ">
          <Link href={"/addPlayer"}>Add Player</Link>
        </button>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre Jugador
                </th>
                <th scope="col" className="px-6 py-3">
                  Goles
                </th>
                <th scope="col" className="px-6 py-3">
                  Partidos
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  <span className="sr-only">Delete</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Utilizamos un ciclo for para iterar sobre los jugadores */}
              {(() => {
                const rows = [];

                const sortedPlayers = [...players];
                sortedPlayers.sort((a, b) => {
                    if (b.goals === a.goals) {
                      return a.matchs - b.matchs;
                    }
                    return b.goals - a.goals;
                });

                for (let i = 0; i < sortedPlayers.length; i++) {
                  const playerData = sortedPlayers[i];
                  rows.push(
                    <tr
                      key={playerData._id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {playerData.player}
                      </th>
                      <td className="px-6 py-4">{playerData.goals}</td>
                      <td className="px-6 py-4">{playerData.matchs}</td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/editPlayer/${playerData._id}`}>
                          <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                            Edit
                          </button>
                        </Link>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <RemoveBtn id={playerData._id}/>
                      </td>
                    </tr>
                  );
                }
                return rows;
              })()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
