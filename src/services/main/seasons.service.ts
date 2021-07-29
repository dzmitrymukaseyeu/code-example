import { client, processError } from '../http';
import Season from '../../models/Season';

const url = '/api/seasons/';

export default class SeasonsService {
  static getAll = async () => {
    try {
      const res = await client.get<Season[]>(url);

      return res.data;
    } catch (e) {
      processError(e);
      return null;
    }
  };

  static get = async (id: number) => {
    try {
      const res = await client.get<Season[]>(url + id);

      return res.data;
    } catch (e) {
      processError(e);
      return null;
    }
  };

}