"use client";

import dynamic from "next/dynamic";
import { Earthquake } from "@/types/earthquake";

const DynamicMap = dynamic(() => import("./MapInner"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-2xl border-2 border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">Loading Map</h3>
        <p className="text-gray-600">
          Preparing interactive earthquake visualization...
        </p>
      </div>
    </div>
  ),
});

interface MapProps {
  data: Earthquake[];
}

export default function MapView({ data }: MapProps) {
  return <DynamicMap data={data} />;
}
