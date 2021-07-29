import React, { useState } from 'react';
import { Button, Grid, Typography } from '@material-ui/core';
import TournamentService from '../../../../services/main/tournament.service';
import Toasters from '../../../../components/popUp/PopUp';
import Loader from '../../../../components/loader/Loader';
import useStyles from './DeleteTournamentModal.styles';
import { EmptyVoidFunction } from '../../../../utils/types';

const defaultProps = {
  handleClose: () => {},
};

export default function DeleteTournamentModal(props: {
  tournamentId: number;
  handleClose?: EmptyVoidFunction;
}) {
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const sendDeleteRequest = async () => {
    setIsLoading(true);
    if (props.tournamentId) {
      const res = await TournamentService.delete(props.tournamentId);

      if (res) {
        Toasters.success('Турнир успешно удален');
      }
    }

    setIsLoading(false);
    if (props.handleClose) {
      props.handleClose();
    }
  };

  return (
    <Grid className={classes.modalContent}>
      {isLoading
        ? <Loader />
        : (
          <Grid className={classes.contentWrapper}>
            <Typography className={classes.contentTitle}>Вы точно хотите удалить турнир?</Typography>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={sendDeleteRequest}
            >
              Удалить
            </Button>
          </Grid>
        )}
    </Grid>
  );
}

DeleteTournamentModal.defaultProps = defaultProps;