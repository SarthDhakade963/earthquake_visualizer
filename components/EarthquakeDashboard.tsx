"use client";

import { useState, useEffect } from "react";
import { fetchEarthquakes, Period } from "@/lib/fetchEarthquakes";
import { Earthquake } from "@/types/earthquake";
import MapView from "./MapView";
import { Range } from "react-range";

export default function EarthquakeDashboard() {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>([]);
  const [period, setPeriod] = useState<Period>("all_day");
  const [minMag, setMinMag] = useState(0);
  const [maxMag, setMaxMag] = useState(10);
  const [loading, setLoading] = useState(false);

  async function loadData() {
    setLoading(true);
    try {
      const data = await fetchEarthquakes(period);
      setEarthquakes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [period]);

  const filtered = earthquakes.filter(
    (eq) =>
      eq.mag !== null &&
      eq.mag >= minMag &&
      eq.mag <= maxMag
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 p-4 border rounded-xl bg-gray-50">
        <div className="space-x-2">
          {(["all_hour", "all_day", "all_week", "all_month"] as Period[]).map(
            (p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                  period === p
                    ? "bg-blue-600 text-white"
                    : "bg-white border hover:bg-gray-100"
                }`}
              >
                {p.replace("all_", "").toUpperCase()}
              </button>
            )
          )}
        </div>

        <button
          onClick={loadData}
          disabled={loading}
          className="ml-auto px-4 py-1.5 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? "Refreshing..." : "🔄 Refresh"}
        </button>
      </div>

      {/* Magnitude filter */}
      <div className="p-4 rounded-xl border bg-gray-50">
        <div className="font-semibold mb-2">
          Magnitude Filter ({minMag.toFixed(1)} – {maxMag.toFixed(1)})
        </div>

        <Range
          step={0.1}
          min={0}
          max={10}
          values={[minMag, maxMag]}
          onChange={([min, max]) => {
            setMinMag(min);
            setMaxMag(max);
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-2 w-full bg-gray-300 rounded"
              style={{ ...props.style }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="h-4 w-4 bg-blue-600 rounded-full cursor-pointer"
            />
          )}
        />
      </div>

      {/* Map */}
      {loading ? (
        <div className="text-center py-10 text-gray-500">Loading...</div>
      ) : (
        <MapView data={filtered} />
      )}

      {/* Legend */}
      <div className="p-4 rounded-xl border text-sm bg-gray-50">
        <div className="font-semibold mb-2">Legend (by Magnitude)</div>
        <div className="flex gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-green-500 rounded-full"></span> 0–2.5
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-yellow-400 rounded-full"></span> 2.5–5
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-orange-500 rounded-full"></span> 5–7
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-red-600 rounded-full"></span> 7+
          </div>
        </div>
      </div>
    </div>
  );
}
