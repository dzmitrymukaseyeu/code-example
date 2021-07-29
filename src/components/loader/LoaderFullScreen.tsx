import React from 'react';
import { CircularProgress, Grid } from '@material-ui/core';
import useStyles from './Loader.style';

export default function LoaderFullScreen() {
  const styles = useStyles();

  return (
    <Grid className={styles.fullScreen}>
      <CircularProgress disableShrink />
    </Grid>
  );
}