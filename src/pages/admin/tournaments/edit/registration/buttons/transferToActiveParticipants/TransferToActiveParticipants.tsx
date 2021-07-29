import React from 'react';
import { Button } from '@material-ui/core';
import useConfirmationDialog from '../../../../../../../components/useConfirmationDialog/UseConfirmationDialog';
import RegistrationService from '../../../../../../../services/main/registration.service';
import { EmptyVoidFunction } from '../../../../../../../utils/types';
import Toasters from '../../../../../../../components/popUp/PopUp';

const TransferToActiveParticipants = (props: {
  participantId: number | null;
  fetchAllParticipants: EmptyVoidFunction;
}) => {
  const { participantId, fetchAllParticipants } = props;

  const { Dialog, onOpen, onClose } = useConfirmationDialog({
    headerText: 'Добавить в основной список',
    bodyText: 'Вы точно хотите добавить участника в основной список?',
    confirmationButtonText: 'Продолжить',
    onConfirmClick: async () => {
      if (participantId) {
        const res = await RegistrationService.transferToActiveParticipants(participantId);
        if (res) {
          Toasters.success('Участник успешно добавлен в основной список');
        }
      }
      onClose();
      fetchAllParticipants();
    },
  });

  return (
    <>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => onOpen()}
      >
        Добавить в основной список
      </Button>
      <Dialog />
    </>
  );
};

export default TransferToActiveParticipants;