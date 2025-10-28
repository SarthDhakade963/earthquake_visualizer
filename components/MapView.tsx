"use client";

import dynamic from "next/dynamic";
import { Earthquake } from "@/types/earthquake";

// Dynamically import the Leaflet components
const Map = dynamic(() => import("./MapInner"), { ssr: false });

interface MapProps {
  data: Earthquake[];
}

export default function MapView({ data }: MapProps) {
  return <Map data={data} />;
}
