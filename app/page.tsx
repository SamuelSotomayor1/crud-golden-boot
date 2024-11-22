import PlayersList from "@/components/playersList";


export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center space-y-8">
        <div className="mt-10 w-full max-w-6xl">
          <PlayersList />
        </div>
      </div>
    </>
  );
}
