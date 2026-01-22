import TeamBattles from "./Components/TeamBattles";
import Solo from "./Components/Solo";
import Background from "./Components/Background";

// &sp=CAI%253D

export default function App() {
  return (
    <main className="font-[Ubuntu] text-[12px] md:text-[13px] text-gray-300">
      <Background />
      <img src="gunrox_icon.png" alt="GUNROX ICON" className="mx-auto w-25" draggable={false} />
      {/* Solo */}
      <div className="divider divider-neutral font-[Jersey] text-[24px] text-white my-5">1v1 Battles</div>
      <Solo />
      {/* Team */}
      <div className="divider divider-neutral font-[Jersey] text-[24px] text-white my-5">Team Battles</div>
      <TeamBattles />
    </main>
  );
}
