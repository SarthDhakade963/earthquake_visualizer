"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Earthquake } from "@/types/earthquake";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

interface MapWithFilterProps {
  data: Earthquake[];
}

export default function MapWithFilter({ data }: MapWithFilterProps) {
  const [minMag, setMinMag] = useState(0);
  const [maxMag, setMaxMag] = useState(10);

  const filtered = useMemo(
    () =>
      data.filter(
        (eq) => eq.mag !== null && eq.mag >= minMag && eq.mag <= maxMag
      ),
    [data, minMag, maxMag]
  );

  return (
    <div className="space-y-4">
      <div className="bg-white p-6 rounded-2xl border-2 border-gray-200 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold text-lg text-gray-800">
            🎚️ Filter by Magnitude
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {minMag.toFixed(1)} – {maxMag.toFixed(1)}
          </div>
        </div>

        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={minMag}
            onChange={(e) =>
              setMinMag(Math.min(parseFloat(e.target.value), maxMag))
            }
            className="w-full h-3 bg-linear-to-r from-green-400 to-blue-500 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={maxMag}
            onChange={(e) =>
              setMaxMag(Math.max(parseFloat(e.target.value), minMag))
            }
            className="w-full h-3 bg-linear-to-r from-blue-500 to-red-500 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className="mt-4 text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-100">
          Showing{" "}
          <span className="font-bold text-blue-600">{filtered.length}</span> of{" "}
          <span className="font-bold">{data.length}</span> earthquakes
        </div>
      </div>

      <MapView data={filtered} />
    </div>
  );
}
