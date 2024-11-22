"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";

export default function AddPlayer() {

    const [player, setPlayer] = useState("");
    const [goals, setGoals] = useState("");
    const [matchs, setMatchs] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!player || !goals || !matchs){
            alert("Complete all the fields");
            return;
        }
        
        try {
            const res = await fetch("http://localhost:3000/api/players", {
                method : "POST",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({player, goals, matchs}),
            });
            if(res.ok){
                router.push("/players");
            } else {
                throw new Error("Failed to agregate a player")
            }
        } catch (error) {
            console.log(error);
        }

    };

   
        return (
        <>
        <div className="flex flex-col ml-32">
            <h1 className="font-bold py-10 text-2xl">
                Add New Player
            </h1>
        </div>
        <div className="flex w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 ml-32">
                <input
                onChange={(e) => setPlayer(e.target.value)} 
                value={player}
                className="mt-4 w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                type="text"
                placeholder="Ingresa el jugador"
                />
                <input 
                onChange={(e) => setGoals(e.target.value)} 
                value={goals}
                className="mt-10 w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                type="number"
                placeholder="Ingresa la cantidad de goles"
                />
                <input 
                onChange={(e) => setMatchs(e.target.value)} 
                value={matchs}
                className="mt-10 w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                type="number"
                placeholder="Ingresa la cantidad de partidos"
                />
                <button type="submit" 
                className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded mt-10">Add Player</button>
            </form>
        </div>
        </>
    );
}