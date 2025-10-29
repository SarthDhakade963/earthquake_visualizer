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

  return (
    <div className="space-y-6">
      <section className="space-y-6">
        <div className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-lg shadow-sm w-fit">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="font-medium">Live Data: Past 24 Hours</span>
        </div>

        <EarthquakeDashboard data={earthquakes} />
      </section>

    
    </div>
  );
}
