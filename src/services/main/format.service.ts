import { client, processError } from '../http';
import TournamentFormat from '../../models/TournamentsFormat';

const url = '/api/Formats';

const FormatService = {
  async get() {
    try {
      const response = await client.get<TournamentFormat[]>(url);
      return response.data;
    } catch (error) {
      processError(error);
      return null;
    }
  }
};

export default FormatService;