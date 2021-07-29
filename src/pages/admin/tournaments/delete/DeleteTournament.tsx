import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import AreatroutModal from '../../../../components/modal/modal';
import DeleteTournamentModal from './DeleteTournamentModal';
import { EmptyVoidFunction } from '../../../../utils/types';

export default function DeleteTournament(props: { getTournament: EmptyVoidFunction, id: number }) {
  const { getTournament, id } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <AreatroutModal
        header="Удалить"
        open={open}
        setOpen={setOpen}
        onClose={getTournament}
      >
        <DeleteTournamentModal tournamentId={id} />
      </AreatroutModal>

      <IconButton
        edge="end"
        aria-label="delete"
        onClick={() => setOpen(true)}
      >
        <Delete />
      </IconButton>
    </>
  );
}