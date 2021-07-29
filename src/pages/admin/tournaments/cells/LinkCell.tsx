import React from 'react';
import { Link } from '@material-ui/core';

const LinkCell = (props: {
  data: string
}) => {
  const { data } = props;

  return (
  /* eslint-disable-next-line */
    <Link underline="none">
      {data}
    </Link>
  );
};

export default LinkCell;