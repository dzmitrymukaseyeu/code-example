import React, { Button, Grid, Typography } from '@material-ui/core';
import useStyles from './ConfirmationDialog.style';
import { EmptyVoidFunction } from '../../utils/types';

function ConfirmationDialog(props: {
  bodyText: string;
  onConfirmClick: EmptyVoidFunction;
  confirmationButtonText: string;
}) {
  const { bodyText, onConfirmClick, confirmationButtonText } = props;
  const classes = useStyles();

  return (
    <Grid className={classes.contentWrapper}>
      <Typography className={classes.contentTitle}>{bodyText}</Typography>
      <Button
        className={classes.contentButton}
        variant="contained"
        color="primary"
        onClick={onConfirmClick}
        autoFocus
      >
        {confirmationButtonText}
      </Button>
    </Grid>
  );
}

export default ConfirmationDialog;