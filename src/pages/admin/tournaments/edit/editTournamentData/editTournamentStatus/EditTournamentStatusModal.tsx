import React, { useEffect, useState } from 'react';
import {
  Button, Select, MenuItem, Grid,
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TournamentService from '../../../../../../services/main/tournament.service';
import Status from '../../../../../../models/Status';
import TournamentStatus from '../../../../../../models/TournamentStatus';
import schema from './validationSchema';
import useStyles from './EditTournamentStatusModal.style';
import Toasters from '../../../../../../components/popUp/PopUp';
import Loader from '../../../../../../components/loader/Loader';
import { EmptyVoidFunction } from '../../../../../../utils/types';

const defaultProps = {
  handleClose: () => {},
};

export default function EditTournamentStatusModal(props: {
  tournamentId: number;
  handleClose?: EmptyVoidFunction;
  statusId: number;
}) {
  const { tournamentId, handleClose, statusId } = props;
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles();

  const [allStatus, setAllStatus] = useState<Array<Status> | null>([]);

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const getStatuses = async () => {
    const response = await TournamentService.getStatuses();
    setAllStatus(response);
    setIsLoading(false);
  };

  useEffect(() => {
    getStatuses();
  }, []);

  const sendEditRequest = async (data: TournamentStatus) => {
    const result = { ...data };
    result.tournamentId = tournamentId;
    setIsLoading(true);
    const response = await TournamentService.updateStatus(result);

    if (response) {
      Toasters.success('Статус изменен');
    }

    setIsLoading(false);
    if (handleClose) {
      handleClose();
    }
  };

  return (
    <Grid className={classes.modalContent}>
      {isLoading ? (
        <Loader />
      ) : (
        <form className={classes.flex} onSubmit={handleSubmit(sendEditRequest)}>
          {allStatus && allStatus.length && (
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  autoFocus
                  variant="outlined"
                  className={classes.margin}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    e.stopPropagation();
                  }}
                >
                  {allStatus.map((el) => (
                    <MenuItem key={el.status} value={el.status}>
                      {el.description}
                    </MenuItem>
                  ))}
                </Select>
              )}
              name="status"
              control={control}
              defaultValue={statusId}
            />
          )}
          <Button
            variant="contained"
            color="primary"
            className={classes.margin}
            type="submit"
            disabled={!isDirty || !isValid}
          >
            Изменить
          </Button>
        </form>
      )}
    </Grid>
  );
}

EditTournamentStatusModal.defaultProps = defaultProps;