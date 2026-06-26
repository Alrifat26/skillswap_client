"use client";

import {
ResponsiveContainer,
BarChart,
Bar,
XAxis,
YAxis,
Tooltip,
CartesianGrid,
} from "recharts";

export default function AdminAnalytics({
stats,
}) {
const data = [
{
name: "Users",
value: stats.totalUsers,
},
{
name: "Tasks",
value: stats.totalTasks,
},
{
name: "Active",
value: stats.activeTasks,
},
{
name: "Revenue",
value: stats.totalRevenue,
},
];

return ( <div className="mt-10 rounded-3xl bg-white p-8 shadow-xl"> <div className="mb-8"> <h2 className="text-3xl font-bold text-slate-900">
Platform Analytics </h2>

    <p className="mt-2 text-slate-500">
      Real-time overview of users,
      tasks and revenue.
    </p>
  </div>

  <div className="h-[420px]">
    <ResponsiveContainer
      width="100%"
      height="100%"
    >
      <BarChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
        />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="value"
          radius={[12, 12, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>


);
}
