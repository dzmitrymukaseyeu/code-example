import { client, processError } from '../http';
import Ranking from '../../models/Ranking';

const url = '/api/Rankings/';

export default class RankingService {
  static getAll = async () => {
    try {
      const res = await client.get<Ranking[]>(url);

      return res.data;
    } catch (e) {
      processError(e);
      return null;
    }
  };
}