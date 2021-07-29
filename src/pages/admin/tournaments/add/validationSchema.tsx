import {
  array, object, string, number, date,
} from 'yup';

const schema = object().shape({
  name: string().required('Наименование не должно быть пустым'),
  description: string(),
  date: date().required(),
  ratingIds: array().min(1, 'Необходимо выбрать тип рейтингов'),
  locationId: string().required('Необходимо выбрать локацию'),
  participantsLimit: number().required('Укажите число').positive('Укажите число больше нуля').integer('необходимо указать целое число'),
  rankingId: string().required('Необходимо выбрать тип зачета'),
  seasonId: string().required('Необходимо выбрать сезон'),
  formatId: string().required('Необходимо выбрать формат турнира'),
  regulationsLink: string().url('Ссылка должна быть вида: http(s)://example.com'),
  rulesLink: string().url('Ссылка должна быть вида: http(s)://example.com'),
});

export default schema;