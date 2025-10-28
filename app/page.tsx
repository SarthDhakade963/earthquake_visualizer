import EarthquakeClient from "@/components/EarthquakeClient";
import { fetchEarthquakes } from "@/lib/fetchEarthquakes";
import { Earthquake } from "@/types/earthquake";

export default async function Home() {
  const earthquakes: Earthquake[] = await fetchEarthquakes("all_day");

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            🌍 Earthquake Visualizer
          </h1>
          <p className="text-gray-600 text-lg">
            Real-time seismic activity monitoring and analysis
          </p>
        </header>
        <EarthquakeClient initialData={earthquakes} />
      </div>
    </main>
  );
}
