import Link from "next/link";

const getPlayers = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/players",{
            cache: "no-store",
        });

        if(!res.ok){
            throw new Error("Failed to fetch players");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading players", error);
    }
};

export default async function PlayersList(){
    const {players} = await getPlayers();

    return (
        <>
        <div className="overflow-x-auto">
            <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
                <Link href={"/addPlayer"}>
                Add Player
                </Link>
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
                        </tr>
                    </thead>
                    <tbody>
                        {players.map((playerData) => (
                            <tr key={playerData._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {playerData.player}
                                </th>
                                <td className="px-6 py-4">
                                    {playerData.goals}
                                </td>
                                <td className="px-6 py-4">
                                    {playerData.matchs}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <Link href={`/editPlayer/${playerData._id}`}>
                                    <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">Edit</button>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <button className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">Delete</button>
                                </td>
                            </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}