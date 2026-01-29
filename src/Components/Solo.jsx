import { matches } from "../Data/battles";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import BarGraph from "./BarGraph";

export function getYTid(text) {
  return text.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)[1];
}

export default function Solo() {
  const [pageIndex, setPageIndex] = useState(1); // current page

  const sortedByDate = matches.sort((a, b) => new Date(b.time) - new Date(a.time));

  // Pagnition
  const ITEMS_PER_PAGE = 20;
  const TOTAL_Page = Math.ceil(sortedByDate.length / 20);

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
    <div className="w-full max-w-400 mx-auto">
      {/* Graph & List */}
      <div className="flex flex-col md:flex-row gap-1 my-4 text-[12px] p-1">
        <div className="flex flex-col sm:flex-row md:flex-col gap-1 w-full">
          <div className="bg-black/80 rounded p-2 relative">
            <div className="py-1 text-center">Most 1x1 Art Games Won 2026 / Account.</div>
            <img
              src={`http://www.gunrox.com/portrait/${stats2026[0][0]}`}
              alt="Player"
              className="absolute bottom-0 right-1/2 translate-x-[50%] w-30 mx-auto drop-shadow-[0_0_12px_#ff0000]"
              draggable={false}
            />
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
          <div className="bg-black/80 rounded p-2 relative">
            <div className="py-1 text-center">Most 1x1 Art Games Won / Account.</div>
            <img
              src={`http://www.gunrox.com/portrait/${higherStats[0][0]}`}
              alt="Player"
              className="absolute bottom-0 right-1/2 translate-x-[50%] w-30 mx-auto drop-shadow-[0_0_12px_#ff0000]"
              draggable={false}
            />
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
          <div className="bg-black/80 rounded p-2 relative">
            <div className="py-1 text-center">Most 1x1 Art Games Played / Account.</div>
            <img
              src={`http://www.gunrox.com/portrait/${appearStats[0][0]}`}
              alt="Player"
              className="absolute bottom-0 right-1/2 translate-x-[50%] w-30 mx-auto drop-shadow-[0_0_12px_#ff0000]"
              draggable={false}
            />
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1 p-1">
        {paginatedData.map((obj, ind) => (
          <div className="rounded-sm p-1 relative">
            <div className="absolute w-full h-full top-0 right-0 -z-10 bg-center bg-cover" />
            <img
              src={`https://img.youtube.com/vi/${getYTid(obj.link)}/maxresdefault.jpg`}
              alt="Gameplay Video"
              className="aspect-video rounded border border-black/80"
              loading="lazy"
              draggable={false}
            />
            <div className="text-wrap text-center line-clamp-1 text-white text-[11px]">
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
    </div>
  );
}
