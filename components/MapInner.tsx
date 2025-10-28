"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Earthquake } from "@/types/earthquake";

interface MapViewProps {
  data: Earthquake[];
}

const MapInner: React.FC<MapViewProps> = ({ data }) => {
  const getColor = (mag: number) => {
    if (mag < 2.5) return "#22c55e"; // green
    if (mag < 5) return "#facc15"; // yellow
    if (mag < 7) return "#fb923c"; // orange
    return "#ef4444"; // red
  };

  const getMagnitudeLabel = (mag: number) => {
    if (mag < 2.5) return "Minor";
    if (mag < 5) return "Light to Moderate";
    if (mag < 7) return "Strong to Major";
    return "Great";
  };

  const getMagnitudeIcon = (mag: number) => {
    if (mag < 2.5) return "🟢";
    if (mag < 5) return "🟡";
    if (mag < 7) return "🟠";
    return "🔴";
  };

  const getMagnitudeStyles = (mag: number) => {
    if (mag < 2.5) return "bg-green-500/20 text-green-600 border-green-500";
    if (mag < 5) return "bg-yellow-400/20 text-yellow-600 border-yellow-500";
    if (mag < 7) return "bg-orange-500/20 text-orange-600 border-orange-500";
    return "bg-red-600/20 text-red-600 border-red-600";
  };

  return (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 relative group">
      {/* Data counter badge */}
      <div className="absolute top-4 left-4 z-1000 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-lg border border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-gray-700">
            {data.length} Active Earthquakes
          </span>
        </div>
      </div>

      {/* Empty state overlay */}
      {data.length === 0 && (
        <div className="absolute inset-0 z-1000 bg-white/90 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No Data Available</h3>
            <p className="text-gray-600">Adjust filters to see earthquakes on the map</p>
          </div>
        </div>
      )}

      <MapContainer
        center={[20, 0]}
        zoom={2}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
        key={data.length}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {data.map((eq) => {
          const magnitude = eq.mag || 0;
          const color = getColor(magnitude);

          return (
            <CircleMarker
              key={eq.id}
              center={[eq.latitude, eq.longitude]}
              radius={5 + magnitude * 1.5}
              pathOptions={{
                color: color,
                fillColor: color,
                fillOpacity: 0.7,
                weight: 2,
                opacity: 0.9,
              }}
            >
              <Popup>
                <div className="min-w-[240px] p-2">
                  {/* Header with magnitude badge */}
                  <div className="flex items-start justify-between gap-3 mb-3 pb-3 border-b-2 border-gray-100">
                    <div className="flex-1">
                      <div className="font-bold text-base text-gray-800 mb-1">
                        📍 {eq.place || "Unknown location"}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(eq.time).toLocaleString(undefined, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </div>
                    </div>
                    <div className={`shrink-0 px-3 py-1.5 rounded-lg font-bold text-lg border-2 ${getMagnitudeStyles(magnitude)}`}>
                      {magnitude.toFixed(1)}
                    </div>
                  </div>

                  {/* Details grid */}
                  <div className="space-y-2">
                    <div className="bg-linear-to-r from-gray-50 to-white p-2.5 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-600">Severity</span>
                        <span className="text-sm font-bold text-gray-800 flex items-center gap-1">
                          {getMagnitudeIcon(magnitude)} {getMagnitudeLabel(magnitude)}
                        </span>
                      </div>
                    </div>

                    <div className="bg-linear-to-r from-gray-50 to-white p-2.5 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-600">Depth</span>
                        <span className="text-sm font-bold text-gray-800">
                          {eq.depth.toFixed(1)} km
                        </span>
                      </div>
                    </div>

                    <div className="bg-linear-to-r from-gray-50 to-white p-2.5 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-gray-600">Coordinates</span>
                        <span className="text-sm font-mono text-gray-800">
                          {eq.latitude.toFixed(2)}°, {eq.longitude.toFixed(2)}°
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>

      {/* Hover instruction tooltip */}
      <div className="absolute bottom-4 right-4 z-1000 bg-black/75 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Click markers for details
      </div>
    </div>
  );
};

export default MapInner;