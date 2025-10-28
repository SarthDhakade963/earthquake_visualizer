"use client";

import { Earthquake } from "@/types/earthquake";
import React, { useState, useMemo } from "react";
import { TimeDisplay } from "./TimeDisplay";

interface EarthquakeListProps {
  data: Earthquake[];
  onSelect?: (quake: Earthquake) => void;
}

export default function EarthquakeList({
  data,
  onSelect,
}: EarthquakeListProps) {
  const [sortOrder, setSortOrder] = useState("desc");

  const sortedQuakes = useMemo(() => {
    return [...data].sort((a, b) =>
      sortOrder === "desc"
        ? (b.mag ?? 0) - (a.mag ?? 0)
        : (a.mag ?? 0) - (b.mag ?? 0)
    );
  }, [data, sortOrder]);

  const getMagnitudeColor = (mag: number) => {
    if (mag < 2.5) return "text-green-600 bg-green-50 border-green-200";
    if (mag < 5) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    if (mag < 7) return "text-orange-600 bg-orange-50 border-orange-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <span>📊</span> Recent Earthquakes
        </h2>
        <select
          className="border-2 border-gray-200 rounded-xl px-4 py-2 text-sm font-semibold bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="desc">Magnitude: High → Low</option>
          <option value="asc">Magnitude: Low → High</option>
        </select>
      </div>

      {sortedQuakes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌍</div>
          <p className="text-gray-500 text-lg">
            No earthquakes found in this time period.
          </p>
        </div>
      ) : (
        <div className="grid gap-3 max-h-[600px] overflow-y-auto pr-2">
          {sortedQuakes.slice(0, 15).map((quake) => (
            <div
              key={quake.id}
              onClick={() => onSelect?.(quake)}
              className="cursor-pointer border-2 border-gray-200 rounded-xl p-4 hover:border-blue-400 hover:shadow-md transition-all group bg-gradient-to-r from-white to-gray-50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors truncate">
                    📍 {quake.place}
                  </p>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      🕐 <TimeDisplay time={quake.time} />
                    </span>
                    <span>•</span>
                    <span>Depth: {quake.depth.toFixed(1)} km</span>
                  </div>
                </div>
                <div
                  className={`px-3 py-1.5 rounded-lg border-2 font-bold text-lg ${getMagnitudeColor(
                    quake.mag
                  )}`}
                >
                  {quake.mag.toFixed(1)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
