"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface Player {
    id: string;
    player: string;
    goals: number;
    matchs: number;
}

export default function EditProductForm({id, player, goals, matchs}:Player) {
    const [newPlayer, setNewPlayer] = useState(player);
    const [newGoals, setNewGoals] = useState(goals);
    const [newMatchs, setNewMatchs] = useState(matchs);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
            const res = await fetch(`http://localhost:3000/api/players/${id}`, {
                method : "PUT",
                headers: {
                    "Content-Type" : "application/json",
                },
                body: JSON.stringify({newPlayer, newGoals, newMatchs}),
            });

            if(!res.ok){
                throw new Error("Failed to update player");
            }

            router.refresh();
            router.push("/")
    
            } catch (error) {
            console.log(error);
        }

    };   

    return (
    <>
        <div className="flex flex-col ml-32">
            <h1 className="font-bold py-10 text-2xl">
                Edit Player {id}
            </h1>
        </div>
        <div className="flex w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 ml-32">
                <input
                onChange={(e) => setNewPlayer(e.target.value)} 
                value={newPlayer}
                className="mt-4 w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                type="text"
                placeholder="Ingresa el jugador"
                />
                <input 
                onChange={(e) => setNewGoals(Number(e.target.value))} 
                value={newGoals}
                className="mt-10 w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                type="number"
                placeholder="Ingresa la cantidad de goles"
                />
                <input 
                onChange={(e) => setNewMatchs(Number(e.target.value))} 
                value={newMatchs}
                className="mt-10 w-96 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
                type="number"
                placeholder="Ingresa la cantidad de partidos"
                />
                <button type="submit" 
                className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded mt-10">Edit Player</button>
            </form>
        </div>
    </>
    );
}