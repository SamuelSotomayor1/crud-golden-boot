import EditPlayerForm from "@/components/EditPlayerForm";

interface Params {
    params: {
        id: string;
    };
}

const getPlayerById = async (id: string|number) =>{
    try {
        const res = await fetch(`http://localhost:3000/api/players/${id}`, {
            cache: "no-store",
        });

        if(!res.ok){
            throw new Error("Failed to fetch player");
        }

        return await res.json();
    } catch (error) {
        console.log(error);
    }
};

export default async function EditPlayer({params}: Params) {
    const { id } = params;
    const {players} = await getPlayerById(id);
    const {player, goals, matchs} = players;
    return(
        <>
            <EditPlayerForm id={id} player={player || ""} goals={goals || 0} matchs={matchs || 0}/>
        </>
    );
}
