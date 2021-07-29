import LocationData from '../../models/LocationData';
import Location from '../../models/Location';
import { client, processError } from '../http';

const url = '/api/Locations/';

const LocationService = {
  async get() {
    try {
      const response = await client.get<LocationData[]>(url);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  }
};

export default LocationService;