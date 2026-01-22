import { matches } from "../Data/battles";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import BarGraph from "./BarGraph";

function sToA(string) {
  const array = string.split(`,`);
  return array;
}

export default function Solo() {
  const [pageIndex, setPageIndex] = useState(1); // current page

  const sortedByDate = matches.sort((a, b) => new Date(b.time) - new Date(a.time));

  // Pagnition
  const ITEMS_PER_PAGE = 16;
  const TOTAL_Page = Math.ceil(sortedByDate.length / 16);

  const paginatedData = useMemo(() => {
    const start = (pageIndex - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return sortedByDate.slice(start, end);
  }, [sortedByDate, pageIndex]);

  const higherStats = Object.entries(
    sortedByDate.reduce((acc, pla) => {
      const player = pla.win;
      acc[player] = (acc[player] || 0) + 1;
      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const stats2026 = Object.entries(
    sortedByDate
      .filter((obj) => new Date(obj.time) > new Date(`12/30/2025`))
      .reduce((acc, pla) => {
        const player = pla.win;
        acc[player] = (acc[player] || 0) + 1;
        return acc;
      }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const appearStats = Object.entries(
    sortedByDate.reduce((acc, pla) => {
      const uniquePlayers = new Set([pla.p1, pla.p2]);

      uniquePlayers.forEach((player) => {
        if (!player) return;
        acc[player] = (acc[player] || 0) + 1;
      });

      return acc;
    }, {}),
  ).sort((a, b) => b[1] - a[1]);

  return (
    <>
      <div className="w-full max-w-350 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1 p-1">
          {paginatedData.map((obj, ind) => (
            <div className="border border-black/60 rounded-sm p-1 relative">
              <div
                className="absolute w-full h-full top-0 right-0 -z-10 bg-center bg-cover"
                style={{ backgroundImage: `url(/Map/${obj.map}.webp)` }}
              />
              <div className="absolute w-full h-full top-0 right-0 -z-10 bg-black/75" />

              <div className="text-[11px] text-center">Game #{matches.length - ind}</div>
              <div className="text-center my-2">
                {ind <= 3 ? (
                  obj.p1.includes(",") ? (
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
                    <div className="flex justify-between rounded">
                      <div>
                        <img
                          src={`http://www.gunrox.com/portrait/${obj.p1}`}
                          alt="Player"
                          className="w-25 mx-auto drop-shadow-[0_0_15px_#ff0000]"
                          draggable={false}
                        />
                        <div className="text-[15px] font-[Jersey] antialiased">{obj.p1}</div>
                      </div>
                      <div className="my-auto text-[yellow] font-[Jersey] text-[20px]">VS</div>
                      <div>
                        <img
                          src={`http://www.gunrox.com/portrait/${obj.p2}`}
                          alt="Player"
                          className="w-25 mx-auto drop-shadow-[0_0_15px_#0000ff]"
                          draggable={false}
                        />
                        <div className="text-[15px] font-[Jersey] antialiased">{obj.p2}</div>
                      </div>
                    </div>
                  )
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
        <div className="flex justify-center gap-4 my-4 items-center font-[Ubuntu]">
          <button
            disabled={pageIndex === 1}
            onClick={() => setPageIndex((prev) => prev - 1)}
            className="min-w-15 bg-[white] text-black rounded cursor-pointer"
          >
            Prev
          </button>
          <div className="text-white">
            {pageIndex}/{TOTAL_Page}
          </div>
          <button
            disabled={pageIndex * ITEMS_PER_PAGE >= sortedByDate.length}
            onClick={() => setPageIndex((prev) => prev + 1)}
            className="min-w-15 bg-[white] text-black rounded cursor-pointer"
          >
            Next
          </button>
        </div>
        {/* Graph & List */}
        <div className="flex flex-col md:flex-row gap-1 my-6 text-[12px] p-1">
          <div className="flex flex-col sm:flex-row md:flex-col gap-1 w-full">
            <div className="bg-black/80 rounded p-2">
              <div className="py-1 text-center">Most Art Games Won 2026, Per Account.</div>
              {stats2026.slice(0, 5).map((arr, inde) => (
                <div className="flex justify-between px-2">
                  <div>{arr[0]}</div>
                  <div>{arr[1]}</div>
                </div>
              ))}
            </div>
            <BarGraph data={stats2026} />
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-1 w-full">
            <div className="bg-black/80 rounded p-2">
              <div className="py-1 text-center">Most Art Games Won, Per Account.</div>
              {higherStats.slice(0, 5).map((arr, inde) => (
                <div className="flex justify-between px-2">
                  <div>{arr[0]}</div>
                  <div>{arr[1]}</div>
                </div>
              ))}
            </div>
            <BarGraph data={higherStats} />
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-1 w-full">
            <div className="bg-black/80 rounded p-2">
              <div className="py-1 text-center">Most Art Games Played, Per Account.</div>
              {appearStats.slice(0, 5).map((arr, inde) => (
                <div className="flex justify-between px-2">
                  <div>{arr[0]}</div>
                  <div>{arr[1]}</div>
                </div>
              ))}
            </div>
            <BarGraph data={appearStats} />
          </div>
        </div>
        {/* Graph & List */}
      </div>
    </>
  );
}
