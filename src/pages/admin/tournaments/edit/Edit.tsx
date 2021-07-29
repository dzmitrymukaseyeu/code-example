import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TabsContainer from '../../../../components/tabsContainer/TabsContainer';
import EditTournamentData from './editTournamentData/EditTournamentData';
import TournamentService from '../../../../services/main/tournament.service';
import AdminTournamentDetails from '../../../../models/AdminTournamentDetails';
import { tournamentStatus } from '../../../../enum';
import Registration from './registration/Registration';

const Edit = () => {
  const url = useParams<{ id: string }>();
  const id = Number(url.id);
  const [tournament, setTournament] = useState<AdminTournamentDetails | null>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const disabledChangingStatuses = [
    tournamentStatus.Close,
    tournamentStatus.Completed,
  ];
  const getTournament = async () => {
    const response = await TournamentService.getById(id);

    if (response) {
      setTournament(response);
      setIsDrawing(response.drawingWasGenerated);
    }
  };
  useEffect(() => {
    getTournament();
  }, []);

  const EditTournamentContent = [
    {
      name: 'Данные',
      component: <EditTournamentData
        currentTournament={tournament}
        getTournament={getTournament}
        isInputDisabled={!!(tournament && disabledChangingStatuses.includes(tournament.status))}
      />,
    },
    {
      name: 'Регистрация',
      component: <Registration currentTournament={tournament} getTournament={getTournament} />,
    }
  ];

  return <TabsContainer data={EditTournamentContent} />;
};

export default Edit;