import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  ListItemText,
  Checkbox,
  TextField,
  Link,
  IconButton,
  FormHelperText,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment/moment';
import { Edit, Check } from '@material-ui/icons';
import { getRatingsIds } from '../../../../../utils/utils';
import SeasonsService from '../../../../../services/main/seasons.service';
import schema from './validationSchema';
import AdminTournamentDetails from '../../../../../models/AdminTournamentDetails';
import TournamentFormat from '../../../../../models/TournamentsFormat';
import AdminTournamentUpdateRequest from '../../../../../models/AdminTournamentUpdateRequest';
import Season from '../../../../../models/Season';
import Rating from '../../../../../models/Rating';
import Location from '../../../../../models/Location';
import Ranking from '../../../../../models/Ranking';
import RankingService from '../../../../../services/main/ranking.service';
import TournamentService from '../../../../../services/main/tournament.service';
import FormatService from '../../../../../services/main/format.service';
import LocationService from '../../../../../services/main/location.service';
import RatingService from '../../../../../services/main/rating.service';
import useStyles from './styles';
import Routes from '../../../../../routing/routes';
import EditTournamentStatus from './editTournamentStatus/EditTournamentStatus';
import LoaderFullScreen from '../../../../../components/loader/LoaderFullScreen';
import Toasters from '../../../../../components/popUp/PopUp';
import { EmptyVoidFunction } from '../../../../../utils/types';

const EditTournamentData = (props: {
  currentTournament: AdminTournamentDetails | null,
  getTournament: EmptyVoidFunction,
  isInputDisabled: boolean
}) => {
  const { currentTournament, getTournament, isInputDisabled } = props;
  const classes = useStyles();
  const history = useHistory();
  const [seasons, setSeasons] = useState<Season[] | null>();
  const [formats, setFormats] = useState<TournamentFormat[] | null>();
  const [rankings, setRankings] = useState<Ranking[] | null>();
  const [ratings, setRatings] = useState<Rating[] | null>(null);
  const [locations, setLocations] = useState<Location[] | null>();
  const [tournament, setTournament] = useState<AdminTournamentDetails | null>();
  const [editRulesLink, setEditRulesLink] = useState(false);
  const [editRegulationsLink, setEditRegulationsLink] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const handleChange = (event: React.ChangeEvent<{ value: any }>) => {
    if (tournament) {
      setTournament({
        ...tournament,
        ratings: event.target.value as string[],
      });
    }
  };

  const handleEdit = async (data: AdminTournamentUpdateRequest) => {
    const ratingsListId = getRatingsIds(ratings, tournament?.ratings);
    const result = { ...data };
    result.id = tournament?.id as number;
    result.ratingIds = ratingsListId;
    result.photos = [];
    setIsLoading(true);
    const res = await TournamentService.update(result);
    if (res) {
      Toasters.success('Турнир успешно изменен');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentTournament) {
      setTournament({
        ...currentTournament,
        ratings: currentTournament.ratings.map((item) => item.name),
      });
    }
  }, [currentTournament]);

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      setSeasons(await SeasonsService.getAll());
      setFormats(await FormatService.get());
      setRankings(await RankingService.getAll());
      setLocations(await LocationService.get());
      setRatings(await RatingService.get());
      setIsLoading(false);
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    setValue('ratingIds', tournament?.ratings);
  }, [tournament?.ratings]);

  if (isLoading) {
    return <LoaderFullScreen />;
  }
  return (
    <>
      {tournament
        && (
        <Grid container spacing={2} direction="row">
          <Grid container item xs={6} direction="column" alignItems="flex-end" className={classes.status}>
            <EditTournamentStatus
              getTournament={getTournament}
              tournamentId={tournament.id}
              statusId={tournament.status}
              statusText={tournament.statusText}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <form onSubmit={handleSubmit(handleEdit)}>
              <Grid container spacing={2} direction="column">
                <Grid item xs={12}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue={tournament.name}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled={isInputDisabled}
                        type="text"
                        variant="outlined"
                        fullWidth
                        error={!!errors.name}
                        helperText={errors?.name?.message}
                        label="Наименование турнира"
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="date"
                    control={control}
                    defaultValue={moment.utc(tournament.date).local().format('YYYY-MM-DD')}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled={isInputDisabled}
                        type="date"
                        variant="outlined"
                        fullWidth
                        label="Дата проведения турнира"
                        InputLabelProps={{ shrink: true }}
                        error={!!errors.date}
                        helperText={errors?.date?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="participantsLimit"
                    control={control}
                    defaultValue={tournament.participantsLimit}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled={isInputDisabled}
                        type="number"
                        variant="outlined"
                        fullWidth
                        label="Ограничение по максимальному количеству участников"
                        inputProps={{
                          min: '0',
                        }}
                        onInput={(event: ChangeEvent<HTMLInputElement>) => {
                          const { target } = event;

                          if (!target.validity.valid) {
                            target.value = '';
                          }

                          return target;
                        }}
                        error={!!errors.participantsLimit}
                        helperText={errors?.participantsLimit?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Сезон</InputLabel>
                    {seasons && (
                    <Controller
                      name="seasonId"
                      control={control}
                      defaultValue={tournament.seasonId}
                      render={({ field }) => (
                        <Select
                          {...field}
                          disabled={isInputDisabled}
                          variant="outlined"
                          label="Сезон"
                          value={field.value}
                          onChange={field.onChange}
                        >
                          {seasons
                                && seasons.map((season) => (
                                  <MenuItem key={season.id} value={season.id}>
                                    {season.name}
                                  </MenuItem>
                                ))}
                        </Select>
                      )}
                    />
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Формат</InputLabel>
                    {formats && (
                    <Controller
                      name="formatId"
                      control={control}
                      defaultValue={tournament.formatId}
                      render={({ field }) => (
                        <Select
                          {...field}
                          disabled={isInputDisabled}
                          variant="outlined"
                          label="Формат"
                          value={field.value}
                          onChange={field.onChange}
                        >
                          {formats
                                && formats.map((format) => (
                                  <MenuItem key={format.id} value={format.id}>
                                    {format.name}
                                  </MenuItem>
                                ))}
                        </Select>
                      )}
                    />
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Зачет</InputLabel>
                    {rankings && (
                    <Controller
                      name="rankingId"
                      control={control}
                      defaultValue={tournament.rankingId}
                      render={({ field }) => (
                        <Select
                          {...field}
                          disabled={isInputDisabled}
                          variant="outlined"
                          label="Зачет"
                          value={field.value}
                          onChange={field.onChange}
                        >
                          {rankings
                                && rankings.map((ranking) => (
                                  <MenuItem key={ranking.id} value={ranking.id}>
                                    {ranking.name}
                                  </MenuItem>
                                ))}
                        </Select>
                      )}
                    />
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl variant="outlined" fullWidth>
                    <InputLabel>Локация</InputLabel>
                    {locations && (
                    <Controller
                      name="locationId"
                      control={control}
                      defaultValue={tournament.locationId}
                      render={({ field }) => (
                        <Select
                          {...field}
                          disabled={isInputDisabled}
                          variant="outlined"
                          label="Локация"
                          value={field.value}
                          onChange={field.onChange}
                        >
                          {locations
                                && locations.map((location) => (
                                  <MenuItem
                                    key={location.id}
                                    value={location.id}
                                  >
                                    {location.name}
                                  </MenuItem>
                                ))}
                        </Select>
                      )}
                    />
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    error={!!errors.ratingIds}
                    variant="outlined"
                    fullWidth
                  >
                    <InputLabel>Рейтинги</InputLabel>
                    <Controller
                      name="ratingIds"
                      control={control}
                      defaultValue={tournament.ratings}
                      render={({ field }) => (
                        <Select
                          {...field}
                          disabled={isInputDisabled}
                          multiple
                          variant="outlined"
                          label="Рейтинги"
                          value={tournament?.ratings}
                          onChange={handleChange}
                          renderValue={(selected) => (selected as string[]).join(', ')}
                        >
                          {ratings
                              && ratings.map((rating: Rating) => (
                                <MenuItem key={rating.id} value={rating.name}>
                                  <Checkbox
                                    checked={
                                      tournament.ratings
                                      && tournament.ratings.includes(rating.name)
                                    }
                                  />
                                  <ListItemText primary={rating.name} />
                                </MenuItem>
                              ))}
                        </Select>
                      )}
                    />
                    <FormHelperText>
                      {errors?.ratingIds?.message}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="regulationsLink"
                    control={control}
                    defaultValue={tournament.regulationsLink}
                    render={({ field }) => (
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        className={classes.editWrapper}
                      >
                        <Grid item sm={9}>
                          {editRegulationsLink ? (
                            <TextField
                              {...field}
                              disabled={isInputDisabled}
                              type="text"
                              variant="outlined"
                              fullWidth
                              label="Регламент"
                              value={field.value || ''}
                              error={!!errors.regulationsLink}
                              helperText={errors?.regulationsLink?.message}
                            />
                          ) : (
                            <Typography className={classes.link}>
                              {field.value ? (
                                <Link
                                  href={field.value}
                                  target="_blank"
                                  rel="noopener"
                                >
                                  Регламент
                                </Link>
                              ) : (
                                'Ссылка на регламент не добавлена'
                              )}
                            </Typography>
                          )}
                        </Grid>
                        <IconButton
                          className={classes.linkButton}
                          color="primary"
                          edge="start"
                          aria-label="edit"
                          disabled={!!errors.regulationsLink || isInputDisabled}
                          onClick={() => {
                            setEditRegulationsLink((s) => !s);
                          }}
                        >
                          {editRegulationsLink ? (
                            <Check aria-disabled={!isDirty || !isValid} />
                          ) : (
                            <Edit />
                          )}
                        </IconButton>
                      </Grid>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="rulesLink"
                    control={control}
                    defaultValue={tournament.rulesLink}
                    render={({ field }) => (
                      <Grid
                        container
                        justify="space-between"
                        alignItems="center"
                        className={classes.editWrapper}
                      >
                        <Grid item sm={9}>
                          {editRulesLink ? (
                            <TextField
                              {...field}
                              disabled={isInputDisabled}
                              type="text"
                              variant="outlined"
                              fullWidth
                              label="Правила"
                              value={field.value || ''}
                              error={!!errors.rulesLink}
                              helperText={errors?.rulesLink?.message}
                            />
                          ) : (
                            <Typography className={classes.link}>
                              {field.value ? (
                                <Link
                                  href={field.value}
                                  target="_blank"
                                  rel="noopener"
                                >
                                  Правила
                                </Link>
                              ) : (
                                'Ссылка на правила не добавлена'
                              )}
                            </Typography>
                          )}
                        </Grid>
                        <IconButton
                          className={classes.linkButton}
                          color="primary"
                          edge="start"
                          aria-label="edit"
                          disabled={!!errors.regulationsLink || isInputDisabled}
                          onClick={() => {
                            setEditRulesLink((s) => !s);
                          }}
                        >
                          {editRulesLink ? <Check /> : <Edit />}
                        </IconButton>
                      </Grid>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name="description"
                    control={control}
                    defaultValue={tournament.description}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        disabled={isInputDisabled}
                        multiline
                        rows={5}
                        type="text"
                        variant="outlined"
                        fullWidth
                        label="Описание турнира"
                        error={!!errors.description}
                        helperText={errors?.description?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
                    spacing={2}
                  >
                    <Button
                      className={classes.button}
                      name="button"
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isDirty && !isValid}
                    >
                      Сохранить
                    </Button>
                    <Button
                      className={classes.button}
                      name="button"
                      type="submit"
                      variant="contained"
                      onClick={() => history.push(Routes.AdminTournaments.path)}
                    >
                      Отменить
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
        )}
    </>
  );
};

export default EditTournamentData;