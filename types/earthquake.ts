export interface Earthquake {
  id: string;
  mag: number | null;
  place: string | null;
  time: number;
  latitude: number;
  longitude: number;
  depth: number;
}
