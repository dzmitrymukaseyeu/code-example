import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import useStyles from './Loader.style';

const defaultProps = {
  className: '',
};

export default function Loader(props: {
  className?: string;
}) {
  const styles = useStyles();
  const { className } = props;

  return (
    <Grid className={styles.smallLoader}>
      <CircularProgress disableShrink className={className} />
    </Grid>
  );
}

Loader.defaultProps = defaultProps;