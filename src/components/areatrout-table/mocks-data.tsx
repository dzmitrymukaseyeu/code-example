import React from 'react';
import Button from '@material-ui/core/Button';

const columns = [
  {
    displayName: 'Спортсмен', fieldName: 'name', allowSortring: false, allowSearch: true, render: ({ name }: any) => <Button>{name}</Button>,
  },
  {
    displayName: 'Турниров', fieldName: 'tournament', allowSortring: false, allowSearch: true,
  },
  {
    displayName: 'Поимок', fieldName: 'catch', allowSortring: true, allowSearch: false,
  },
  {
    displayName: 'Золото', fieldName: 'golden', allowSortring: true, allowSearch: false,
  },
  {
    displayName: 'Серебро', fieldName: 'silver', allowSortring: true, allowSearch: false,
  },
  {
    displayName: 'Бронза', fieldName: 'bronze', allowSortring: true, allowSearch: false,
  },
  {
    displayName: 'Atlas', fieldName: 'atlas', allowSortring: true, allowSearch: false,
  },
];

const rows = [
  {
    id: 1,
    name: 'Дмитрий Мукасеев',
    tournament: 2,
    catch: 66,
    golden: 3,
    silver: null,
    bronze: 1,
    atlas: 1,
  },
  {
    id: 2,
    name: 'Кулик Александр',
    tournament: 4,
    catch: 30,
    golden: 1,
    silver: null,
    bronze: 4,
    atlas: 1,
  },
  {
    id: 3,
    name: 'Павлючик Андрей',
    tournament: 2,
    catch: 66,
    golden: 3,
    silver: null,
    bronze: 1,
    atlas: 2,
  },
  {
    id: 4,
    name: 'Карпенко Павел',
    tournament: 10,
    catch: 101,
    golden: 10,
    silver: 5,
    bronze: 1,
    atlas: 3,
  },
  {
    id: 5,
    name: 'Хилько Артем',
    tournament: 2,
    catch: 66,
    golden: 3,
    silver: null,
    bronze: 1,
    atlas: 1,
  },
  {
    id: 6,
    name: 'Гормнакова Татьяна',
    tournament: 2,
    catch: 66,
    golden: 3,
    silver: null,
    bronze: 1,
    atlas: 1,
  },
  {
    id: 7,
    name: 'Карпухин Сергей',
    tournament: 2,
    catch: 66,
    golden: 3,
    silver: null,
    bronze: 1,
    atlas: 1,
  },
  {
    id: 8,
    name: 'Воронович Сергей',
    tournament: 2,
    catch: 66,
    golden: 3,
    silver: null,
    bronze: 1,
    atlas: 1,
  },
  {
    id: 9,
    name: 'Сорокин Дмитрий',
    tournament: 2,
    catch: 66,
    golden: 3,
    silver: null,
    bronze: 1,
    atlas: 1,
  },
  {
    id: 10,
    name: 'Лисовский Юрий',
    tournament: 2,
    catch: 66,
    golden: 3,
    silver: null,
    bronze: 1,
    atlas: 1,
  },
];

export {
  columns,
  rows,
};