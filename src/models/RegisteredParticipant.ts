import Country from './Country';

interface RegisteredParticipant {
  id?: number;
  registrationId: number;
  creationDate: string;
  userId: string;
  profilePicture?: FormData;
  fullName?: string;
  country?: Country;
}

export default RegisteredParticipant;