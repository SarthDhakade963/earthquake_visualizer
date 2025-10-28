import { Earthquake } from "@/types/earthquake";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

interface MapProps {
  data: Earthquake[];
}

const MapView = ({ data }: MapProps) => {
  return (
    <MapContainer
      center={[20, 0] as [number, number]}
      zoom={2}
      className="h-[90vh] w-full rounded-2xl"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="0 OpenStreetMap"
      />

      {data.map((eq) => (
        <Marker key={eq.id} position={[eq.latitude, eq.longitude]}>
          <Popup>
            <strong>{eq.place}</strong>
            <br />
            Magnitude: {eq.mag}
            <br />
            Depth: {eq.depth} km
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
