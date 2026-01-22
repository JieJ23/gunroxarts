import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function BarGraph({ data }) {
  const graphData = data.slice(0, 10).map(([nam, count]) => ({
    nam,
    count,
  }));
  return (
    <div className="h-75 w-full mx-auto text-[10px] font-[Ubuntu] rounded bg-black/80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={graphData}
          margin={{
            top: 20,
            right: 20,
            left: -20,
            bottom: 40,
          }}
        >
          <CartesianGrid stroke="#80808080" strokeDasharray="" vertical={false} />
          <XAxis dataKey="nam" stroke="#ffffff" angle={-35} textAnchor="end" interval={0} dy={20} />
          <YAxis stroke="#ffffff" />
          <Bar dataKey="count" fill="#00ffaa" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
