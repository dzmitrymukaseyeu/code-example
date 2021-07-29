import Round from './Round';
import ImageData from './ImageData';

interface Participant {
    id: number;
    anglerId: string;
    angler: {
        firstName: string;
        lastName: string;
        fullName: string;
        profilePicture: ImageData | null;
        profilePictureId: number | null;
    };
    anglerNumber: number;
    tournamentId: number;
    rounds: Round[];
    isCompleted: boolean;
    rowStyles: {};
    catchesSum: number;
    place: number;
    scoresSum: number;
}

export default Participant;