import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import { tournamentStatus } from '../../../../../../enum';
import AdminTournamentDetails from '../../../../../../models/AdminTournamentDetails';
import TournamentService from '../../../../../../services/main/tournament.service';
import { EmptyVoidFunction } from '../../../../../../utils/types';
import Loader from '../../../../../../components/loader/Loader';
import useStyles from './styles';

const ToggleStatus = (props: {
  tournament: AdminTournamentDetails | null,
  getTournament: EmptyVoidFunction
}) => {
  const classes = useStyles();
  const { tournament, getTournament } = props;
  const [isLoading, setIsLoading] = useState(false);
  const disabledButtonStatuses = [
    tournamentStatus.Canceled,
    tournamentStatus.Completed,
  ];

  const updateTournamentStatus = async () => {
    if (tournament) {
      const { status } = tournament;

      const isStatusPlanningOrClose = [tournamentStatus.Planning, tournamentStatus.Close].includes(status)
        ? tournamentStatus.Open : status;

      const newStatus = status === tournamentStatus.Open
        ? tournamentStatus.Close
        : isStatusPlanningOrClose;

      if (status !== newStatus) {
        setIsLoading(true);
        await TournamentService.updateStatus({ tournamentId: tournament.id, status: newStatus });
        getTournament();
      }
    }
  };

  useEffect(() => {
    setIsLoading(false);
  }, [tournament?.status]);

  const updateButtonName = () => {
    if (tournament) {
      return tournament.status === tournamentStatus.Open ? 'Закрыть регистрацию' : 'Открыть регистрацию';
    }
    return null;
  };

  return (
    <Button
      size="small"
      variant="contained"
      color="primary"
      disabled={tournament ? disabledButtonStatuses.includes(tournament.status) : true}
      onClick={() => updateTournamentStatus()}
      className={classes.button}
    >
      {isLoading ? <Loader className={classes.loader} /> : updateButtonName()}
    </Button>
  );
};

export default ToggleStatus;