import Country from './Country';

interface Location {
    id: number;
    name: string;
    countryId: number;
    description: string;
    longitude: number | null;
    latitude: number | null;
    images?: number[];
    country: Country | null;
}

export default Location;