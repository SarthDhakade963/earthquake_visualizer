"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchEarthquakes, Period } from "@/lib/fetchEarthquakes";
import { Earthquake } from "@/types/earthquake";
import LegendChart from "./LegendChart";
import MapWithFilter from "./MapWithFilter";
import InsightsChart from "./InsightsChart";
import EarthquakeList from "./EarthquakeList";

interface EarthquakeDashboardProps {
  data: Earthquake[];
}

export default function EarthquakeDashboard({
  data,
}: EarthquakeDashboardProps) {
  const [earthquakes, setEarthquakes] = useState<Earthquake[]>(data || []);
  const [period, setPeriod] = useState<Period>("all_day");
  const [loading, setLoading] = useState(false);
  const periods: Period[] = ["all_hour", "all_day", "all_week", "all_month"];
  const [selectedQuake, setSelectedQuake] = useState<Earthquake | null>(null);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const fetched = await fetchEarthquakes(period);
      setEarthquakes((prev) => (fetched.length > 0 ? fetched : prev));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [period]);

  useEffect(() => {
    if (data && data.length > 0 && period === "all_day") return;
    loadData();
  }, [period, loadData]);

  const periodLabel = (p: Period) =>
    p === "all_hour"
      ? "Past Hour"
      : p === "all_day"
      ? "Past Day"
      : p === "all_week"
      ? "Past Week"
      : "Past Month";

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2 flex-wrap">
            {periods.map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  period === p
                    ? "bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md scale-105"
                    : "bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                }`}
              >
                {periodLabel(p)}
              </button>
            ))}
          </div>

          <button
            onClick={loadData}
            disabled={loading}
            className="ml-auto px-6 py-2.5 rounded-xl bg-linear-to-r from-green-500 to-emerald-600 text-white font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
          >
            <span className={loading ? "animate-spin" : ""}>🔄</span>
            {loading ? "Refreshing..." : "Refresh Data"}
          </button>
        </div>
      </div>

      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center rounded-2xl z-10">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <span className="text-gray-700 font-semibold">
                Loading earthquake data...
              </span>
            </div>
          </div>
        )}
        <MapWithFilter data={earthquakes} />
      </div>

      <LegendChart />
      <InsightsChart data={earthquakes} />

      <EarthquakeList
        data={earthquakes}
        onSelect={(quake) => setSelectedQuake(quake)}
      />

      {selectedQuake && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedQuake(null)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              Earthquake Details
            </h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Location</span>
                <p className="font-semibold text-gray-800">
                  {selectedQuake.place}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Magnitude</span>
                  <p className="text-2xl font-bold text-red-600">
                    {selectedQuake.mag.toFixed(1)}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Depth</span>
                  <p className="text-xl font-semibold text-gray-800">
                    {selectedQuake.depth.toFixed(1)} km
                  </p>
                </div>
              </div>
              <div>
                <span className="text-sm text-gray-500">Time</span>
                <p className="font-medium text-gray-800">
                  {new Date(selectedQuake.time).toLocaleString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedQuake(null)}
              className="mt-6 w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
