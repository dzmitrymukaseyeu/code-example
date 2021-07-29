import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import AreatroutModal from '../../../../../../components/modal/modal';
import EditTournamentStatusModal from './EditTournamentStatusModal';
import useStyles from './EditTournamentStatus.style';
import { EmptyVoidFunction } from '../../../../../../utils/types';

export default function EditTournamentStatus(props: {
  getTournament: EmptyVoidFunction;
  tournamentId: number;
  statusId: number;
  statusText: string;
}) {
  const classes = useStyles();
  const {
    getTournament, tournamentId, statusId, statusText,
  } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <AreatroutModal
        header="Изменить статус"
        open={open}
        setOpen={setOpen}
        onClose={getTournament}
        className={classes.modalWindow}
      >
        <EditTournamentStatusModal tournamentId={tournamentId} statusId={statusId} />
      </AreatroutModal>
      <div className={classes.statusText}>
        Статус турнира:
        {' '}
        <strong>{statusText}</strong>
      </div>
      <Button
        variant="contained"
        color="primary"
        className={classes.buttonPadding}
        onClick={() => setOpen(true)}
      >
        Изменить статус
      </Button>
    </>
  );
}