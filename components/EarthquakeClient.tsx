"use client";

import { useState } from "react";
import { Earthquake } from "@/types/earthquake";
import EarthquakeDashboard from "@/components/EarthquakeDashboard";
import InsightsChart from "@/components/InsightsChart";
import EarthquakeList from "@/components/EarthquakeList";

interface Props {
  initialData: Earthquake[];
}

export default function EarthquakeClient({ initialData }: Props) {
  const [earthquakes] = useState<Earthquake[]>(initialData);
  const [selectedQuake, setSelectedQuake] = useState<Earthquake | null>(null);

  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm w-fit">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Live Data: Past 24 Hours</span>
        </div>

        <EarthquakeDashboard data={earthquakes} />
        <InsightsChart data={earthquakes} />
      </section>

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
