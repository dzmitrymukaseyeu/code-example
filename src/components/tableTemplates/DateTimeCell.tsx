import React from 'react';
import { Grid } from '@material-ui/core';
import { transformToDateTime } from '../../utils/utils';

const defaultProps = {
  className: ''
};

function DateTimeCell(props: {
  date: string;
  className?: string;
}) {
  const { date, className } = props;
  return (
    <Grid className={className}>
      {transformToDateTime(date)}
    </Grid>
  );
}

export default DateTimeCell;

DateTimeCell.defaultProps = defaultProps;