import TournamentService from '../services/main/tournament.service';
import { processError } from '../services/http';

const AllowedToEditTournamentGuard = async (to: any, from: any, next: any) => {
  const { id } = to.match.params;
  try {
    await TournamentService.getById(id);
    return next();
  } catch (e) {
    processError(e);
  }
  return null;
};

export default AllowedToEditTournamentGuard;