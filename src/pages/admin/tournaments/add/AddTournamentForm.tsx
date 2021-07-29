import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  FormHelperText,
  Checkbox,
  ListItemText,
  Grid,
} from '@material-ui/core';
import clsx from 'clsx';
import schema from './validationSchema';
import TournamentService from '../../../../services/main/tournament.service';
import LocationService from '../../../../services/main/location.service';
import RatingService from '../../../../services/main/rating.service';
import SeasonsService from '../../../../services/main/seasons.service';
import FormatService from '../../../../services/main/format.service';
import RankingService from '../../../../services/main/ranking.service';
import useStyles from './styles';
import Location from '../../../../models/Location';
import Season from '../../../../models/Season';
import Rating from '../../../../models/Rating';
import Ranking from '../../../../models/Ranking';
import TournamentFormat from '../../../../models/TournamentFormat';
import AddTournament from '../../../../models/AddTournament';
import Toasters from '../../../../components/popUp/PopUp';
import Loader from '../../../../components/loader/Loader';
import { getRatingsIds } from '../../../../utils/utils';
import { EmptyVoidFunction } from '../../../../utils/types';

const defaultProps = {
  handleClose: () => {},
};

function AddTournamentForm(props: {
  handleClose?: EmptyVoidFunction;
  getAllTournaments: EmptyVoidFunction;
}) {
  const { handleClose, getAllTournaments } = props;
  const {
    control,
    setValue,
    handleSubmit,
    formState: { isDirty, isValid, errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      description: '',
      date: '',
      ratingIds: [],
      locationId: 0,
      rankingId: 0,
      seasonId: 0,
      formatId: 0,
      regulationsLink: '',
      participantsLimit: '',
      rulesLink: '',
    },
  });

  const classes = useStyles();
  const [locations, setLocations] = useState<Location[] | null>([]);
  const [ratings, setRatings] = useState<Rating[] | null>([]);
  const [ranking, setRanking] = useState<Ranking[] | null>([]);
  const [formats, setFormats] = useState<TournamentFormat[] | null>([]);
  const [seasons, setSeasons] = useState<Season[] | null>([]);
  const [ratingsList, setRatingsList] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    setRatingsList(event.target.value);
  };

  const setData = async (data: AddTournament) => {
    setIsLoaded(true);
    if (handleClose) {
      handleClose();
    }

    const response = await TournamentService.post(data);
    if (response) {
      Toasters.success('Турнир успешно добавлен');
    }
    getAllTournaments();
    setIsLoaded(false);
  };

  const transformData = (data: any) => {
    const result = { ...data };
    result.ratingIds = getRatingsIds(ratings, data.ratingIds);
    setData(result);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(true);
      setSeasons(await SeasonsService.getAll());
      setFormats(await FormatService.get());
      setRanking(await RankingService.getAll());
      setRatings(await RatingService.get());
      setLocations(await LocationService.get());
      setIsLoaded(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setValue('ratingIds', ratingsList);
  }, [ratingsList]);

  if (isLoaded) {
    return (
      <Grid className={classes.loadingWindow}>
        <Loader />
      </Grid>
    );
  }
  return (
    <form
      className={classes.editWrapper}
      autoComplete="off"
      onSubmit={handleSubmit(transformData)}
      data-testid="newTournament"
    >
      <Controller
        render={({ field }) => (
          <FormControl
            className={clsx([classes.inputRow], { [classes.invalid]: errors?.name, [classes.inputRow]: !errors?.name })}
          >
            <p className={classes.label}>Наименование</p>
            <div>
              <TextField
                {...field}
                autoFocus
                className={classes.inputField}
                error={!!errors.name}
                type="string"
                size="small"
                variant="outlined"
                multiline
                inputProps={{ 'data-testid': 'name' }}
              />
              <FormHelperText data-testid="nameError" className={classes.invalid}>
                {!!errors?.name && errors?.name?.message}
              </FormHelperText>
            </div>
          </FormControl>
        )}
        name="name"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <FormControl
            className={clsx([classes.inputRow], {
              [classes.invalid]: errors?.locationId,
              [classes.inputRow]: !errors?.locationId,
            })}
            variant="outlined"
            size="small"
          >
            <p className={classes.label}>Водоем</p>
            <div>
              <Select
                {...field}
                className={classes.inputField}
                value={field.value}
                onChange={field.onChange}
                native
                multiline
                inputProps={{ 'data-testid': 'location' }}
              >
                <option aria-label="None" value="" />
                {locations && locations.length && locations.map((data: any) => (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                ))}
              </Select>
              <FormHelperText className={classes.invalid} data-testid="locationError">
                {!!errors?.locationId && errors?.locationId?.message}
              </FormHelperText>
            </div>
          </FormControl>
        )}
        name="locationId"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <FormControl
            className={clsx([classes.inputRow], {
              [classes.invalid]: errors?.formatId,
              [classes.inputRow]: !errors?.formatId,
            })}
            variant="outlined"
            size="small"
          >
            <p className={classes.label}>Формат</p>
            <div>
              <Select
                {...field}
                className={classes.inputField}
                value={field.value}
                onChange={field.onChange}
                native
                inputProps={{ 'data-testid': 'format' }}
              >
                <option aria-label="None" value="" />
                {formats && formats.length && formats.map((data: any) => (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                ))}
              </Select>
              <FormHelperText className={classes.invalid} data-testid="formatError">
                {!!errors?.formatId && errors?.formatId?.message}
              </FormHelperText>
            </div>
          </FormControl>
        )}
        name="formatId"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <FormControl
            className={clsx([classes.inputRow], {
              [classes.invalid]: errors?.rankingId,
              [classes.inputRow]: !errors?.rankingId,
            })}
            variant="outlined"
            size="small"
          >
            <p className={classes.label}>Зачет</p>
            <div>
              <Select
                {...field}
                className={classes.inputField}
                value={field.value}
                onChange={field.onChange}
                native
                inputProps={{ 'data-testid': 'ranking' }}
              >
                <option aria-label="None" value="" />
                {ranking && ranking.length && ranking.map((data: any) => (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                ))}
              </Select>
              <FormHelperText className={classes.invalid} data-testid="rankingError">
                {!!errors?.rankingId && errors.rankingId?.message}
              </FormHelperText>
            </div>
          </FormControl>
        )}
        name="rankingId"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <FormControl
            className={clsx([classes.inputRow], {
              [classes.invalid]: errors?.seasonId,
              [classes.inputRow]: !errors?.seasonId,
            })}
            variant="outlined"
            size="small"
          >
            <p className={classes.label}>Сезон</p>
            <div>
              <Select
                {...field}
                className={classes.inputField}
                value={field.value}
                onChange={field.onChange}
                native
                inputProps={{ 'data-testid': 'season' }}
              >
                <option value=""> </option>
                {seasons && seasons.length && seasons.map((data: any) => (
                  <option key={data.id} value={data.id}>
                    {data.name}
                  </option>
                ))}
              </Select>
              <FormHelperText data-testid="seasonError" className={classes.invalid}>
                {!!errors?.seasonId && errors?.seasonId?.message}
              </FormHelperText>
            </div>
          </FormControl>
        )}
        name="seasonId"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <FormControl
            className={clsx([classes.inputRow], {
              [classes.invalid]: errors?.participantsLimit,
              [classes.inputRow]: !errors?.participantsLimit,
            })}
          >
            <p className={classes.label}>Максимальное количество участников</p>
            <div>
              <TextField
                {...field}
                className={classes.inputField}
                type="number"
                variant="outlined"
                size="small"
                required
                inputProps={{ 'data-testid': 'quote' }}
              />
              <FormHelperText data-testid="quoteError" className={classes.invalid}>
                {!!errors.participantsLimit && 'Укажите количество участников'}
              </FormHelperText>
            </div>
          </FormControl>
        )}
        name="participantsLimit"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <FormControl
            className={clsx([classes.inputRow], { [classes.invalid]: errors?.date, [classes.inputRow]: !errors?.date })}
          >
            <p className={classes.label}>Дата проведения</p>
            <div>
              <TextField
                {...field}
                className={classes.inputField}
                inputProps={{ 'data-testid': 'date' }}
                type="date"
                size="small"
                variant="outlined"
              />
              <FormHelperText data-testid="dateError" className={classes.invalid}>
                {!!errors.date && 'Необходимо выбрать актуальную дату'}
              </FormHelperText>
            </div>
          </FormControl>
        )}
        name="date"
        control={control}
      />
      <Controller
        render={
          ({ field }) => (
            <FormControl
              variant="outlined"
              size="small"
              className={clsx([classes.inputRow], {
                [classes.invalid]: errors?.ratingIds,
                [classes.inputRow]: !errors?.ratingIds,
              })}
            >
              <p className={classes.label}>Рейтинг</p>
              <div>
                <Select
                  {...field}
                  className={classes.inputField}
                  value={ratingsList}
                  renderValue={(selected) => (selected as string[]).join(', ')}
                  onChange={handleChange}
                  multiple
                  inputProps={{ 'data-testid': 'ratings' }}
                >
                  {ratings && ratings.length && ratings.map((data: any) => (
                    <MenuItem key={data.id} value={data.name}>
                      <Checkbox checked={ratingsList.indexOf(data.name) > -1} />
                      <ListItemText primary={data.name} />
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText className={classes.invalid} data-testid="ratingError">
                  {!!errors.ratingIds && 'Необходимо выбрать типы рейтингов'}
                </FormHelperText>
              </div>
            </FormControl>
          )
}
        control={control}
        name="ratingIds"
      />
      <Controller
        render={({ field }) => (
          <FormControl className={classes.inputRow}>
            <p className={classes.label}>Регламент</p>
            <TextField
              {...field}
              className={classes.inputField}
              type="string"
              size="small"
              variant="outlined"
              multiline
              error={!!errors.regulationsLink}
              helperText={errors?.regulationsLink?.message}
              inputProps={{ 'data-testid': 'regulationsLink' }}
            />
          </FormControl>
        )}
        name="regulationsLink"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <FormControl className={classes.inputRow}>
            <p className={classes.label}>Правила</p>
            <TextField
              {...field}
              margin="dense"
              className={classes.inputField}
              type="string"
              size="small"
              variant="outlined"
              multiline
              error={!!errors.rulesLink}
              helperText={errors?.rulesLink?.message}
              inputProps={{ 'data-testid': 'rulesLink' }}
            />
          </FormControl>
        )}
        name="rulesLink"
        control={control}
      />
      <Controller
        render={({ field }) => (
          <FormControl className={classes.description}>
            <p>Описание турнира</p>
            <TextField
              {...field}
              rows={6}
              type="string"
              size="small"
              variant="outlined"
              multiline
              inputProps={{ 'data-testid': 'description' }}
            />
          </FormControl>
        )}
        name="description"
        control={control}
      />
      <Button
        className={classes.saveButton}
        type="submit"
        disabled={!isDirty || !isValid}
        variant="contained"
        color="primary"
        data-testid="saveButton"
      >
        Cохранить
      </Button>
    </form>
  );
}

export default AddTournamentForm;

AddTournamentForm.defaultProps = defaultProps;