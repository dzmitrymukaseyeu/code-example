import { number, object } from 'yup';

const schema = object().shape({
  status: number().required('Поле не должно быть пустым'),
});

export default schema;