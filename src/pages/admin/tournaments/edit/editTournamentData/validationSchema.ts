import {
  array, date, number, object, string,
} from 'yup';

const schema = object().shape({
  name: string().required('Поле не должно быть пустым'),
  description: string(),
  date: date().typeError('Поле не должно быть пустым').notRequired(),
  participantsLimit: number().typeError('Поле не должно быть пустым')
    .required().min(1, 'Должен быть минимум 1 участник')
    .integer('Необходимо указать целое число'),
  seasonId: number(),
  formatId: number(),
  rankingId: number(),
  locationId: number(),
  ratingIds: array().min(1, 'Рейтинг должен быть выбран'),
  regulationsLink: string().url('Ссылка должна быть вида: http(s)://example.com'),
  rulesLink: string().url('Ссылка должна быть вида: http(s)://example.com'),
});

export default schema;