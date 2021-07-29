interface Round {
  id: number;
  participantId: number;
  opponentId: string;
  opponent: {
      fullName: string;
  };
  sectorNumber: number;
  anglerScore: number | null;
  anglerCatches: number | null;
  opponentCatches: number | null;
  roundNumber: number;
  opponentNum: number;
  hasError: boolean;
  [key: string]: any;
}

export default Round;