export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Location {
  location: string;
  office: string;
  address: string;
  phone: string;
  email: string;
  coordinate: Coordinate;
}

export const identifyLocation = (index: number, { location }: Location) => {
  return location;
};
