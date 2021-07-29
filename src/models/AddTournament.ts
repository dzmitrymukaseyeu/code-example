interface AddTournament {
  name: string;
  description?: string;
  date: string;
  ratingIds: number[];
  locationId: number;
  formatId: number;
  seasonId: number;
  participantsLimit: number | string;
  rankingId: number;
  regulationsLink?: string;
  rulesLink?: string;
}

export default AddTournament;