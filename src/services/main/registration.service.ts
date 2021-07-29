import { client, processError } from '../http';

const url = '/api/Registrations/';

const RegistrationService = {
  async transferToAwaitingParticipants(id: number) {
    try {
      const res = await client.post(`${url}${id}/transfer/waitList`);

      return res.data;
    } catch (error) {
      processError(error);
      return null;
    }
  },

  async transferToActiveParticipants(id: number) {
    try {
      const res = await client.post(`${url}${id}/transfer/activeList`);

      return res.data;
    } catch (error) {
      if (error.response.status === 400) {
        return processError(
          error,
          'Достигнуто максимальное количество участников в основном списке',
        );
      }
      processError(error);
      return null;
    }
  },
};

export default RegistrationService;