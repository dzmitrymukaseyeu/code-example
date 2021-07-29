import React from 'react';
import ParticipantRatio from '../../models/admin/ParticipantRatio';

function ParticipantsRatio(props: {
  tournament: ParticipantRatio
}) {
  const { tournament } = props;
  return (<>{`${tournament.participantsCount || 0}/${tournament.participantsLimit || 0}`}</>);
}

export default ParticipantsRatio;