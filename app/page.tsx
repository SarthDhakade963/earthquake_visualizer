// app/page.tsx
import EarthquakeDashboard from "@/components/EarthquakeDashboard";
import MapView from "@/components/MapView";
import { fetchEarthquakes } from "@/lib/fetchEarthquakes";
import { Earthquake } from "@/types/earthquake";

export default async function Home() {
  // server-side fetch
  const earthquakes: Earthquake[] = await fetchEarthquakes("all_day");

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">🌍 Earthquake Visualizer</h1>

      <section className="mb-6">
        <div className="mb-2">Showing earthquakes: past day</div>
        <main className="p-6 space-y-6">
          <EarthquakeDashboard />
        </main>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Recent events (top 10)</h2>
        <ul className="space-y-2">
          {earthquakes.slice(0, 10).map((eq) => (
            <li key={eq.id} className="p-2 border rounded">
              <div className="font-medium">{eq.place}</div>
              <div>
                mag: {eq.mag ?? "N/A"} • depth: {eq.depth} km •{" "}
                {new Date(eq.time).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
