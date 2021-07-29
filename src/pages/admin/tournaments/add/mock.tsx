import faker from 'faker/locale/ru';

export const mockData = [
  {
    id: faker.datatype.number(),
    name: faker.random.words()
  },
];

export const mockLocations = [
  {
    id: faker.datatype.number(),
    name: faker.random.words(),
    countryId: faker.datatype.number(),
    description: faker.random.words(),
    longitude: faker.datatype.number(),
    latitude: faker.datatype.number(),
    country: null,
    images: null
  }
];

export const mockFormats = [
  {
    id: faker.datatype.number(),
    name: faker.random.words(),
    description: faker.random.words(),
    rules: faker.random.words(),
  }
];

export const newMockTournament = [
  {
    name: faker.random.words(),
    date: faker.random.words(),
    ratingIds: [faker.datatype.number()],
    locationId: faker.datatype.number(),
    formatId: faker.datatype.number(),
    seasonId: faker.datatype.number(),
    participantsLimit: faker.datatype.number() || faker.random.words(),
    rankingId: faker.datatype.number(),
  }
];

export const mockTournament = {
  name: faker.random.words(),
  description: faker.random.words(),
  date: faker.random.words(),
  ratingIds: [faker.datatype.number()],
  locationId: faker.datatype.number(),
  formatId: faker.datatype.number(),
  seasonId: faker.datatype.number(),
  participantsLimit: faker.datatype.number(),
  rankingId: faker.datatype.number(),
  regulationsLink: faker.random.words(),
  rulesLink: faker.random.words(),
};