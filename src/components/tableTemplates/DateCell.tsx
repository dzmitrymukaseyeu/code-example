import React from 'react';
import { transformToDate } from '../../utils/utils';

const DateCell = (props: { value: string }) => {
  const { value } = props;

  return (
    <>
      {transformToDate(value)}
    </>
  );
};

export default DateCell;