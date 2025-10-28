import { Earthquake } from "@/types/earthquake";

export type Period = "all_hour" | "all_day" | "all_week" | "all_month";

interface USGSFeature {
  id: string;
  geometry: {
    coordinates: [number, number, number];
  };
  properties: {
    mag: number;
    place: string;
    time: number;
  };
}

interface USGSResponse {
  features: USGSFeature[];
}

export async function fetchEarthquake(
  period: Period = "all_day"
): Promise<Earthquake[]> {
  const url = `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${period}.geojson`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch the data`);
  }

  const data: USGSResponse[] = await res.json();

  return data.features.map((feature: USGSFeature) => {
    const [longitude, latitude, depth] = feature.geometry.coordinates;

    return {
      id: feature.id,
      mag: feature.properties.mag,
      place: feature.properties.place ?? "unknown location",
      time: feature.properties.time,
      longitude,
      latitude,
      depth,
    };
  });
}
