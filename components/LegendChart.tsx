import React from "react";

const LegendChart = () => {
  const legends = [
    { color: "bg-green-500", label: "0–2.5", desc: "Minor" },
    { color: "bg-yellow-400", label: "2.5–5", desc: "Light to Moderate" },
    { color: "bg-orange-500", label: "5–7", desc: "Strong to Major" },
    { color: "bg-red-600", label: "7+", desc: "Great" },
  ];
  return (
    <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-blue-100 shadow-md">
      <div className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
        <span>🎨</span> Magnitude Legend
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {legends.map((legend, i) => (
          <div
            key={i}
            className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-200"
          >
            <span
              className={`w-5 h-5 ${legend.color} rounded-full shadow-md shrink-0`}
            ></span>
            <div>
              <div className="font-bold text-gray-800">{legend.label}</div>
              <div className="text-xs text-gray-600">{legend.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LegendChart;
