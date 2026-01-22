import { teambattles } from "../Data/Outpost";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

function sToA(string) {
  const array = string.split(`,`);
  return array;
}

export default function TeamBattles() {
  const [teamIndex, setTeamIndex] = useState(1); // current page

  const sortedByDateTeam = teambattles.sort((a, b) => new Date(b.time) - new Date(a.time));

  const ITEMS_PER_PAGE = 9;

  const TOTAL_Team_Page = Math.ceil(sortedByDateTeam.length / 9);

  const paginatedTeam = useMemo(() => {
    const start = (teamIndex - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return sortedByDateTeam.slice(start, end);
  }, [sortedByDateTeam, teamIndex]);

  return (
    <>
      <div className="w-full max-w-350 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 p-1">
          {paginatedTeam.map((obj, ind) => (
            <div className="border border-black/60 rounded-sm p-1 relative">
              <>
                <div
                  className="absolute w-full h-full top-0 right-0 -z-10 bg-center bg-cover"
                  style={{ backgroundImage: `url(/Map/${obj.map}.webp)` }}
                />
                <div className="absolute w-full h-full top-0 right-0 -z-10 bg-black/75" />
              </>
              <div className="text-[11px] text-center">Game #{teambattles.length - ind}</div>
              <div className="text-center my-2">
                {ind <= 2 ? (
                  <div>
                    <div className="flex justify-evenly">
                      {sToA(obj.p1).map((ite) => (
                        <div>
                          <img
                            src={`http://www.gunrox.com/portrait/${ite}`}
                            alt="Player"
                            className="w-20 mx-auto drop-shadow-[0_0_15px_#ff0000]"
                            draggable={false}
                          />
                          <div className="text-[15px] font-[Jersey] antialiased">{ite}</div>
                        </div>
                      ))}
                    </div>
                    <div className="my-auto text-[yellow] font-[Jersey] text-[20px]">VS</div>
                    <div className="flex justify-evenly">
                      {sToA(obj.p2).map((ite) => (
                        <div>
                          <img
                            src={`http://www.gunrox.com/portrait/${ite}`}
                            alt="Player"
                            className="w-20 mx-auto drop-shadow-[0_0_15px_#0000ff]"
                            draggable={false}
                          />
                          <div className="text-[15px] font-[Jersey] antialiased">{ite}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-evenly text-[16px] text-white gap-2 font-[Jersey]">
                    <div>{obj.p1}</div>
                    <div className="text-[yellow]">VS</div>
                    <div>{obj.p2}</div>
                  </div>
                )}
              </div>
              <div className="flex gap-0.5 flex-wrap">
                <div className="badge badge-xs badge-soft badge-success rounded-none">{obj.win}</div>
                <div className="badge badge-xs badge-soft badge-accent rounded-none">{obj.map}</div>
                <div className="badge badge-xs badge-soft badge-accent rounded-none">{obj.time}</div>
                <Link to={obj.link} target="_blank" className="absolute right-1 bottom-1 hover:scale-110">
                  <img src="/play.png" alt="Gameplay Video" className="size-4" />
                </Link>
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
    </>
  );
}
