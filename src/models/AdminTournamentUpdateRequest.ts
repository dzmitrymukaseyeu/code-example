interface AdminTournamentUpdateRequest {
  id: number;
  name: string;
  description: string;
  date: string;
  ratingIds?: number[];
  photos?: any[];
  locationId: number;
  formatId: number;
  seasonId: number;
  participantsLimit: number;
  rankingId: number;
  regulationsLink?: string;
  rulesLink?: string;
}

export default AdminTournamentUpdateRequest;