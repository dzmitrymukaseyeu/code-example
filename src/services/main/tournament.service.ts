import { client, processError } from '../http';
import AdminTournamentGridItem from '../../models/AdminTournamentGridItem';
import Status from '../../models/Status';
import TournamentStatus from '../../models/TournamentStatus';
import AdminTournamentDetails from '../../models/AdminTournamentDetails';
import AdminTournamentUpdateRequest from '../../models/AdminTournamentUpdateRequest';
import AddTournament from '../../models/AddTournament';
import RegisteredParticipant from '../../models/RegisteredParticipant';

const url = '/api/Tournaments/';
const options = {
  headers: { 'Content-Type': 'application/json' },
};

const TournamentService = {
  async get() {
    try {
      const response = await client.get<AdminTournamentGridItem[]>(url);

      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async getActiveParticipants(id: number) {
    try {
      const response = await client.get<RegisteredParticipant[]>(
        `${url}${id}/registrations`,
      );
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async getAwaitingParticipants(id: number) {
    try {
      const response = await client.get<RegisteredParticipant[]>(
        `${url}${id}/registrations/waitList`,
      );

      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async getById(id: number) {
    try {
      const response = await client.get<AdminTournamentDetails>(url + id);

      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async delete(id: number) {
    try {
      const response = await client.delete<AdminTournamentGridItem>(url + id);

      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async update(tournament: AdminTournamentUpdateRequest) {
    try {
      const { id } = tournament;
      const response = await client.put<AdminTournamentUpdateRequest>(
        url + id,
        tournament,
      );
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async post(tournament: AddTournament) {
    try {
      const response = await client.post<AddTournament>(url, tournament);
      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async getStatuses() {
    try {
      const response = await client.get<Status[]>(`${url}statuses`);

      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  },

  async updateStatus(status: TournamentStatus) {
    try {
      const response = await client.put<TournamentStatus>(
        `${url}${status.tournamentId}/status`,
        JSON.stringify(status.status),
        options,
      );

      return response.data;
    } catch (e) {
      processError(e);
      return null;
    }
  }
};

export default TournamentService;