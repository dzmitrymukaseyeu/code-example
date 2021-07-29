import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { AddCircleOutline } from '@material-ui/icons';
import AddTournamentForm from './AddTournamentForm';
import AreatroutModal from '../../../../components/modal/modal';
import useStyles from './styles';
import { EmptyVoidFunction } from '../../../../utils/types';

function AddTournament(props: {
  getAllTournaments: EmptyVoidFunction,
}) {
  const { getAllTournaments } = props;
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const classes = useStyles();

  return (
    <>
      <div className={classes.button}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddCircleOutline />}
          onClick={() => {
            setOpenAdd(true);
          }}
        >
          Добавить
        </Button>
      </div>
      <AreatroutModal
        header="Создать новый турнир"
        open={openAdd}
        setOpen={setOpenAdd}
      >
        <AddTournamentForm getAllTournaments={getAllTournaments} />
      </AreatroutModal>
    </>
  );
}

export default AddTournament;