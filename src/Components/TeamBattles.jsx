import { teambattles } from "../Data/Outpost";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getYTid } from "./Solo";

export default function TeamBattles() {
  const [teamIndex, setTeamIndex] = useState(1); // current page

  const sortedByDateTeam = teambattles.sort((a, b) => new Date(b.time) - new Date(a.time));

  const ITEMS_PER_PAGE = 12;

  const TOTAL_Team_Page = Math.ceil(sortedByDateTeam.length / 12);

  const paginatedTeam = useMemo(() => {
    const start = (teamIndex - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return sortedByDateTeam.slice(start, end);
  }, [sortedByDateTeam, teamIndex]);

  return (
    <div>
      <div className="w-full max-w-400 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 p-1">
          {paginatedTeam.map((obj, ind) => (
            <div className="rounded-sm p-1 relative">
              <div className="absolute w-full h-full top-0 right-0 -z-10 bg-center bg-cover" />
              <img
                src={`https://img.youtube.com/vi/${getYTid(obj.link)}/maxresdefault.jpg`}
                alt="Gameplay Video"
                className="aspect-video rounded border border-black/80"
                loading="lazy"
                draggable={false}
              />
              <div className="text-wrap text-center line-clamp-2 text-white text-[11px]">
                <div>
                  {`${obj.p1} vs ${obj.p2}`} @ {obj.map} {obj.time}
                </div>
              </div>
              <Link className="flex gap-0.5 justify-center items-center  text-[11px]" to={obj.link} target="_blank">
                <div className="text-orange-300">Gameplay Video</div>
                <img src="play.png" alt="Video" className="size-3" />
              </Link>
              <div className="text-center flex justify-center gap-1 items-center text-white">
                <img src="winner.png" alt="Winner" className="size-6" />
                <div>{obj.win}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center gap-4 my-4 items-center font-[Ubuntu]">
        <button
          disabled={teamIndex === 1}
          onClick={() => setTeamIndex((prev) => prev - 1)}
          className="min-w-15 bg-[white] text-black rounded cursor-pointer"
        >
          Prev
        </button>
        <div className="text-white">
          {teamIndex}/{TOTAL_Team_Page}
        </div>
        <button
          disabled={teamIndex * ITEMS_PER_PAGE >= sortedByDateTeam.length}
          onClick={() => setTeamIndex((prev) => prev + 1)}
          className="min-w-15 bg-[white] text-black rounded cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
