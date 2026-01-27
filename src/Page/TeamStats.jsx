import Background from "../Components/Background";
import { Link } from "react-router-dom";
import { teambattles } from "../Data/Outpost"

const allTeamPlayer = [... new Set(
    teambattles.flatMap(obj => obj.p1.split(",") || obj.p2.split(","))
)].sort((a, b) =>
    a.localeCompare(b, undefined, { sensitivity: "base" }),
);

export default function TeamStats() {

    const codex = [];
    for (let i = 0; i < allTeamPlayer.length; i++) {
        const playerArray = teambattles
            .filter((obj) => obj.p1.split(",").includes(allTeamPlayer[i]) || obj.p2.split(",").includes(allTeamPlayer[i]))
            .sort((a, b) => new Date(b.time) - new Date(a.time));
        const gamesWon = playerArray.filter((obj) => obj.win.split(",").includes(allTeamPlayer[i]))
        const gamesLost = playerArray.filter((obj) => obj.win.split(",").includes(allTeamPlayer[i]))
        const wonMaps = Object.entries(
            gamesWon.reduce((acc, ite) => {
                const mapPlayed = ite.map;
                acc[mapPlayed] = (acc[mapPlayed] || 0) + 1;
                return acc;
            }, {}),
        );
        const lostMaps = Object.entries(
            gamesLost.reduce((acc, ite) => {
                const mapPlayed = ite.map;
                acc[mapPlayed] = (acc[mapPlayed] || 0) + 1;
                return acc;
            }, {}),
        );
        codex.push({
            pn: allTeamPlayer[i],
            gamesArr: playerArray,
            winsArr: gamesWon,
            mapObject: wonMaps,
            mapObjectLost: lostMaps,
        });
    }

    const orderCodex = codex.sort((a, b) => b.winsArr.length - a.winsArr.length);

    return (
        <div className="font-[Ubuntu] text-[12px] md:text-[13px] text-gray-300">
            <Background />
            <img src="gunrox_icon.png" alt="GUNROX ICON" className="mx-auto w-25" draggable={false} />
            <div className="text-center flex justify-center gap-1">
                <Link to={`/`}>
                    <div className="p-2 border border-white/20 rounded text-white bg-black px-4">Homepage</div>
                </Link>
                <Link to={`/Stats`}>
                    <div className="p-2 border border-white/20 rounded text-white bg-black px-4">Stats</div>
                </Link>
                <Link to={`/TeamStats`}>
                    <div className="p-2 border border-white/20 rounded text-white bg-black px-4">Team Stats</div>
                </Link>
            </div>
            <div className="w-full max-w-300 mx-auto p-1">
                <div className="overflow-x-scroll my-4">
                    <table className="table table-xs table-zebra bg-black/80 rounded-sm border-separate border-spacing-0.5 ">
                        {/* head */}
                        <thead>
                            <tr className="font-[Ubuntu] text-[12px] text-white">
                                <th>Index</th>
                                <th>Acc</th>
                                <th className="w-75 min-w-60">Total Art Games</th>
                                <th>W/L</th>
                                <th className="min-w-40">Map Won</th>
                                <th className="min-w-40">Map Lost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderCodex.map((obj, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{obj.pn}</td>
                                    <td>
                                        <div>{obj.gamesArr.length}</div>
                                        <div className="flex flex-wrap gap-1 py-1">
                                            {obj.gamesArr.map((obj2, index2) => (
                                                <div className="tooltip">
                                                    <div className="tooltip-content rounded-none bg-white">
                                                        <div className="text-black text-[11px]">
                                                            <div>
                                                                {obj2.p1} vs {obj2.p2}
                                                            </div>
                                                            <div>
                                                                {obj2.map} @ {obj2.time}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={`size-2 rounded-full ${obj2.win.split(",").includes(obj.pn) ? `bg-[#00ffaa]` : `bg-[red]`}`} />
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td>
                                        <div>
                                            {obj.winsArr.length}/{obj.gamesArr.length - obj.winsArr.length}
                                        </div>
                                        <div className="text-[#00ffaa] whitespace-nowrap">
                                            {((obj.winsArr.length / obj.gamesArr.length) * 100).toFixed(2)}% WR
                                        </div>
                                    </td>
                                    <td>
                                        {obj.mapObject.map((arr) => (
                                            <div className="flex justify-between">
                                                <div>{arr[0]}</div>
                                                <div>{arr[1]}</div>
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        {obj.mapObjectLost.map((arr) => (
                                            <div className="flex justify-between">
                                                <div>{arr[0]}</div>
                                                <div>{arr[1]}</div>
                                            </div>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
