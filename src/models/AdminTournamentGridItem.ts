interface AdminTournamentGridItem {
  id: number;
  name: string;
  creationDate: string;
  transformCreationDate: string;
  transformDate: string;
  date: string;
  country: string;
  location: string;
  format: string;
  status: string;
  participantsCount: number;
  participantsLimit: number;
  creatorFullName: string;
}

export default AdminTournamentGridItem;