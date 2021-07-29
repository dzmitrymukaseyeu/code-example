import Season from './Season';
import Location from './Location';

interface AdminTournamentDetails {
  id: number;
  name: string;
  description: string;
  date: string;
  photos: any[];
  locationId: number;
  formatId: number;
  seasonId: number;
  participantsLimit: number;
  rankingId: number;
  regulationsLink?: string;
  rulesLink?: string;
  ratings: any[];
  location: Location;
  format: {};
  season: Season;
  status: number;
  statusText: string;
  creationDate: string;
  editingDate: string;
  ranking: {};
  drawingWasGenerated: boolean;
}

export default AdminTournamentDetails;