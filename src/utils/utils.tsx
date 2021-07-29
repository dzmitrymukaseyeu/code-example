import moment from 'moment';
import AuthorizationUser from '../models/AuthorizationUser';
import { USER_STORAGE_KEY } from '../constants';
import Rating from '../models/Rating';
import 'moment/locale/ru';

export const intersect = (arr1: Array<string>, arr2: Array<string>) => arr1.filter((entry) => arr2.indexOf(entry) !== -1);

export const hasRolesIntersection = (
  arr: Array<string> | undefined,
  currentUser: AuthorizationUser | undefined,
) => {
  if (arr?.length) {
    if (currentUser) {
      return intersect(arr, currentUser.roles).length > 0;
    }
    return false;
  }
  return true;
};

export const StorageService = {
  getUserData() {
    const storedItem = localStorage.getItem(USER_STORAGE_KEY);
    return storedItem ? JSON.parse(storedItem) : null;
  }
};

export const tranformDateToSortableFormat = (date: string | Date) => {
  const transformedDate = moment.utc(date);
  return transformedDate.local().locale('ru').format('YYYY.MM.DD');
};

export const transformToDate = (date: any) => {
  const transformedDate = moment.utc(date);

  return transformedDate.local().locale('ru').format('L');
};

export const transformToDateTime = (date: string) => {
  const transformedDate = moment.utc(date);

  return transformedDate.local().locale('ru').format('L LTS');
};

export const getRatingsIds = (
  allRatings: Rating[] | null,
  tournamentRatings: any[] | undefined,
) => allRatings?.reduce((acc: number[], item: Rating) => {
  if (
    tournamentRatings?.some(
      (el) => el.toUpperCase() === item.name.toUpperCase(),
    )
  ) {
    acc.push(item.id);
  }
  return acc;
}, []);