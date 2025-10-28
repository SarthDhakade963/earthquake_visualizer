"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import { Earthquake } from "@/types/earthquake";

interface InsightsChartProps {
  data: Earthquake[];
}

const InsightsChart: React.FC<InsightsChartProps> = ({ data }) => {
  const categories = Array(10)
    .fill(0)
    .map((_, i) => ({
      range: `${i}-${i + 1}`,
      count: data.filter((d) => d.mag !== null && d.mag >= i && d.mag < i + 1)
        .length,
    }));

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <span>📈</span> Magnitude Distribution
      </h2>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={categories}>
          <defs>
            <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#6366f1" stopOpacity={0.8} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="range"
            label={{
              value: "Magnitude Range",
              position: "insideBottom",
              offset: -5,
              style: { fontWeight: 600 },
            }}
            tick={{ fill: "#6b7280" }}
          />
          <YAxis
            label={{
              value: "Count",
              angle: -90,
              position: "insideLeft",
              style: { fontWeight: 600 },
            }}
            tick={{ fill: "#6b7280" }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "2px solid #e5e7eb",
              borderRadius: "12px",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
            cursor={{ fill: "rgba(59, 130, 246, 0.1)" }}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <Bar
            dataKey="count"
            fill="url(#colorBar)"
            name="Number of Earthquakes"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default InsightsChart;
