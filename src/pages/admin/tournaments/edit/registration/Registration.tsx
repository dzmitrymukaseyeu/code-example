import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@material-ui/core';
import RegisteredParticipant from '../../../../../models/RegisteredParticipant';
import AdminTournamentDetails from '../../../../../models/AdminTournamentDetails';
import LoaderFullScreen from '../../../../../components/loader/LoaderFullScreen';
import ParticipantsTable from './ParticipantsTable';
import TournamentService from '../../../../../services/main/tournament.service';
import useStyles from './styles';
import ToggleStatus from './toggleStatus/ToggleStatus';
import { EmptyVoidFunction } from '../../../../../utils/types';
import TransferToAwaitingParticipants from './buttons/transferToAwaitingParticipants/TransferToAwaitingParticipants';
import TransferToActiveParticipants from './buttons/transferToActiveParticipants/TransferToActiveParticipants';

const Registration = (props: {
  currentTournament: AdminTournamentDetails | null,
  getTournament: EmptyVoidFunction
}) => {
  const classes = useStyles();
  const { currentTournament, getTournament } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [activeParticipants, setActiveParticipants] = useState<RegisteredParticipant[] | null>([]);
  const [awaitingParticipants, setAwaitingParticipants] = useState<RegisteredParticipant[] | null>([]);

  const fetchAllParticipants = async () => {
    setIsLoading(true);
    if (currentTournament) {
      setActiveParticipants(await TournamentService.getActiveParticipants(currentTournament.id));
      setAwaitingParticipants(await TournamentService.getAwaitingParticipants(currentTournament.id));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchAllParticipants();
  }, []);

  if (isLoading) {
    return <LoaderFullScreen />;
  }
  return (
    <Grid container spacing={2} direction="row">
      <Grid container item sm={12} md={3} direction="column" alignItems="center" className={classes.status}>
        <ToggleStatus tournament={currentTournament} getTournament={getTournament} />
      </Grid>
      <Grid container item xs={12} sm={12} md={9}>
        <Grid item sm={12} className={classes.content}>
          <Grid container justify="space-between" alignItems="baseline" className={classes.title}>
            <Typography variant="h5" component="h3" className={classes.titleName}>Основной список</Typography>
            <div className={classes.titleParticipants}>
              Количество участников:
              <span className={classes.titleParticipantsNumber}>
                {activeParticipants?.length}
                /
                {currentTournament?.participantsLimit}
              </span>
            </div>
          </Grid>
          <ParticipantsTable
            ToggleRegistrationButton={TransferToAwaitingParticipants}
            fetchAllParticipants={fetchAllParticipants}
            participants={activeParticipants}
          />
        </Grid>
        <Grid item sm={12}>
          <Grid container justify="space-between" alignItems="baseline" className={classes.title}>
            <Typography variant="h5" component="h3" className={classes.titleName}>Список ожидания</Typography>
            <div className={classes.titleParticipants}>
              Количество участников:
              <span className={classes.titleParticipantsNumber}>
                {awaitingParticipants?.length}
              </span>
            </div>
          </Grid>
          <ParticipantsTable
            ToggleRegistrationButton={TransferToActiveParticipants}
            fetchAllParticipants={fetchAllParticipants}
            participants={awaitingParticipants}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Registration;