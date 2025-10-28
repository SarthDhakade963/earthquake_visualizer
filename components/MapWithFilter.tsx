"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Earthquake } from "@/types/earthquake";
import { Range } from "react-range";

const MapView = dynamic(() => import("./MapView"), { ssr: false });

interface MapWithFilterProps {
  data: Earthquake[];
}

export default function MapWithFilter({ data }: MapWithFilterProps) {
  const [minMag, setMinMag] = useState(0);
  const [maxMag, setMaxMag] = useState(10);

  const filtered = useMemo(
    () =>
      data.filter(
        (eq) => eq.mag !== null && eq.mag >= minMag && eq.mag <= maxMag
      ),
    [data, minMag, maxMag]
  );

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-xl border bg-gray-50">
        <div className="font-semibold mb-2">
          Filter by Magnitude ({minMag.toFixed(1)} – {maxMag.toFixed(1)})
        </div>

        <Range
          step={0.1}
          min={0}
          max={10}
          values={[minMag, maxMag]}
          onChange={([min, max]) => {
            setMinMag(min);
            setMaxMag(max);
          }}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="h-2 w-full bg-gray-300 rounded"
              style={{ ...props.style }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              className="h-4 w-4 bg-blue-600 rounded-full cursor-pointer"
            />
          )}
        />
      </div>

      <MapView data={filtered} />
    </div>
  );
}
