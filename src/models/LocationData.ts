import Country from './Country';

interface LocationData {
  id: number;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  countryId: number;
  country: Country | null;
  images: any;
}

export default LocationData;