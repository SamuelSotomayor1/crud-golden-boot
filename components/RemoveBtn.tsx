"use client";

import { useRouter } from "next/navigation";

interface RemoveBtnProps {
    id: string | number; // Asegúrate de que el tipo coincide con el tipo de 'id'
  }

export default function RemoveBtn({id}: RemoveBtnProps) {
    const router = useRouter();

    const removePlayer = async () => {
        const confirmed = confirm("Are you sure?");

        if(confirmed) {
            const res = await fetch(`http://localhost:3000/api/players?id=${id}`, {
                method: "DELETE",
            });

            if(res.ok){
                router.refresh();
            }
        }
    }

    return (
        <>
            <button onClick={removePlayer} className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded">Delete</button>
        </>
    );
}