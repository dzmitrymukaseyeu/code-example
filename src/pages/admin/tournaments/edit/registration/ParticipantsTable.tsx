import React from 'react';
import AreatroutTable from '../../../../../components/areatrout-table';
import RegisteredParticipant from '../../../../../models/RegisteredParticipant';
import DateTimeCell from '../../../../../components/tableTemplates/DateTimeCell';
import { EmptyVoidFunction } from '../../../../../utils/types';

const defaultProps = {
  ToggleRegistrationButton: () => {},
};

const ParticipantsTable = (props: {
  participants: RegisteredParticipant[] | null;
  fetchAllParticipants: EmptyVoidFunction;
  ToggleRegistrationButton?: any;
}) => {
  const { ToggleRegistrationButton, participants, fetchAllParticipants } = props;
  const columns = [
    {
      displayName: 'Дата регистрации',
      fieldName: 'creationDate',
      allowSearch: false,
      render: ({ creationDate }: RegisteredParticipant) => (
        <DateTimeCell date={creationDate} />
      ),
    },
    {
      displayName: 'Страна',
      fieldName: 'country',
      render: ({ country }: RegisteredParticipant) => (
        <>{country?.name}</>
      ),
    },
    {
      displayName: 'Спортсмен',
      fieldName: 'fullName',
    },
    {
      displayName: 'Участие',
      fieldName: 'participation',
      allowSortring: false,
      allowSearch: false,
      render: ({ registrationId }: RegisteredParticipant) => (
        <ToggleRegistrationButton
          fetchAllParticipants={fetchAllParticipants}
          participantId={registrationId}
        />
      ),
    },
  ];

  return <AreatroutTable columns={columns} rows={participants} />;
};

export default ParticipantsTable;

ParticipantsTable.defaultProps = defaultProps;