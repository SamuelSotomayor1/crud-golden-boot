import Link from "next/link";
export default function PlayersList(){
    return (
        <>
        <div>
            <div>

            </div>
            <button className="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded">
                <Link href={"/addPlayer"}>
                Add Player
                </Link>
            </button>
        </div>
        </>
    );
}