import React, { useEffect, useState } from 'react';
import AreatroutTable from '../../../components/areatrout-table';
import AdminTournamentGridItem from '../../../models/AdminTournamentGridItem';
import ParticipantRatio from '../../../components/tableTemplates/ParticipantsRatio';
import TournamentService from '../../../services/main/tournament.service';
import ManagementCell from './cells/ManagementCell';
import LinkCell from './cells/LinkCell';
import AddTournament from './add/AddTournament';
import LoaderFullScreen from '../../../components/loader/LoaderFullScreen';
import { sortingType } from '../../../enum';
import { tranformDateToSortableFormat, StorageService } from '../../../utils/utils';
import DateCell from '../../../components/tableTemplates/DateCell';
import { adminRole } from '../../../constants';

const Tournaments = () => {
  const [tournaments, setTournaments] = useState<AdminTournamentGridItem[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAllowedCreatorFullName, setIsAllowedCreatorFullName] = useState(false);

  const getAllTournaments = async () => {
    setIsLoading(true);
    const res = await TournamentService.get();
    if (res) {
      res.map((tournament: AdminTournamentGridItem) => {
        tournament.transformCreationDate = tranformDateToSortableFormat(tournament.creationDate);
        tournament.transformDate = tranformDateToSortableFormat(tournament.date);
        return tournament;
      });
      setTournaments(res);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllTournaments();
    setIsAllowedCreatorFullName(StorageService.getUserData()?.roles.some((role: string) => role === adminRole));
  }, []);

  const columns = [
    {
      displayName: 'Наименование',
      fieldName: 'name',
      customSort: (a: any, b: any) => a.name.localeCompare(b.name),
      render: ({ name }: AdminTournamentGridItem) => <LinkCell data={name} />,
    },
    {
      displayName: 'Дата создания',
      fieldName: 'transformCreationDate',
      render: ({ creationDate }: AdminTournamentGridItem) => <DateCell value={creationDate} />,
    },
    {
      displayName: 'Дата проведения',
      fieldName: 'transformDate',
      defaultSort: sortingType.desc,
      render: ({ date }: AdminTournamentGridItem) => <DateCell value={date} />,
    },
    {
      displayName: 'Страна',
      fieldName: 'country',
    },
    {
      displayName: 'Наименование локации',
      fieldName: 'location',
      render: ({ location }: AdminTournamentGridItem) => <LinkCell data={location} />,
    },
    {
      displayName: 'Участники',
      fieldName: 'participantsCount',
      allowSortring: false,
      allowSearch: false,
      render: (tournament: AdminTournamentGridItem) => <ParticipantRatio tournament={tournament} />
    },
    {
      displayName: 'Формат',
      fieldName: 'format',
      allowSearch: false,
    },
    {
      displayName: 'Статус турнира',
      fieldName: 'status',
      allowSearch: false,
    },
    {
      displayName: 'Управление',
      fieldName: 'management',
      allowSortring: false,
      allowSearch: false,
      render: ({ id }: AdminTournamentGridItem) => (
        <ManagementCell
          getTournament={getAllTournaments}
          tournamentId={id}
        />
      ),
    },
  ];

  if (isAllowedCreatorFullName) {
    columns.unshift({
      displayName: 'Организатор',
      fieldName: 'creatorFullName',
    });
  }

  if (isLoading) {
    return <LoaderFullScreen />;
  }
  return (
    <>
      <AddTournament getAllTournaments={getAllTournaments} />
      <AreatroutTable columns={columns} rows={tournaments} />
    </>
  );
};

export default Tournaments;