import Rating from '../../models/Rating';
import { client, processError } from '../http';

const url = '/api/Ratings/';

const RatingService = {
  async get() {
    try {
      const response = await client.get<Rating[]>(url);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  }
};

export default RatingService;