import React from 'react';
import { IconButton, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Edit } from '@material-ui/icons';
import DeleteTournament from '../delete/DeleteTournament';
import Routes from '../../../../routing/routes';
import { EmptyVoidFunction } from '../../../../utils/types';

const ManagementCell = (props: {
  tournamentId: number,
  getTournament: EmptyVoidFunction
}) => {
  const { tournamentId, getTournament } = props;

  return (
    <Grid container justify="space-around">
      <Link to={Routes.EditTournaments.path.replace(':id', String(tournamentId))}>
        <IconButton
          edge="start"
          aria-label="edit"
        >
          <Edit />
        </IconButton>
      </Link>
      <DeleteTournament getTournament={getTournament} id={tournamentId} />
    </Grid>
  );
};

export default ManagementCell;