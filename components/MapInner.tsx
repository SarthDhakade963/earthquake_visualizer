"use client";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import { Earthquake } from "@/types/earthquake";

interface MapInnerProps {
  data: Earthquake[];
  center?: [number, number];
  zoom?: number;
}

// color scale based on magnitude
const colorByMag = (mag: number | null) => {
  if (mag == null) return "#999";
  if (mag < 2.5) return "#00cc66"; // green
  if (mag < 5) return "#ffcc00"; // yellow
  if (mag < 7) return "#ff6600"; // orange
  return "#ff0000"; // red
};

// radius scaling based on magnitude
const radiusByMag = (mag: number | null) => {
  if (mag == null) return 2;
  return Math.pow(mag, 2) / 2 + 3;
};

export default function MapInner({
  data,
  center = [20, 0],
  zoom = 2,
}: MapInnerProps) {
  return (
    <div className="map-full rounded-2xl overflow-hidden shadow">
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {data.map((eq) => (
          <CircleMarker
            key={eq.id}
            center={[eq.latitude, eq.longitude]}
            radius={radiusByMag(eq.mag)}
            color={colorByMag(eq.mag)}
            fillOpacity={0.7}
            stroke={false}
          >
            <Popup>
              <div className="space-y-1">
                <strong>{eq.place ?? "Unknown location"}</strong>
                <div>Magnitude: {eq.mag ?? "N/A"}</div>
                <div>Depth: {eq.depth} km</div>
                <div>{new Date(eq.time).toLocaleString()}</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
