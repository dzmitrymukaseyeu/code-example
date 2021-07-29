import React from 'react';
import { Button } from '@material-ui/core';
import useConfirmationDialog from '../../../../../../../components/useConfirmationDialog/UseConfirmationDialog';
import RegistrationService from '../../../../../../../services/main/registration.service';
import { EmptyVoidFunction } from '../../../../../../../utils/types';
import Toasters from '../../../../../../../components/popUp/PopUp';

const TransferToAwaitingParticipants = (props: {
  participantId: number | null;
  fetchAllParticipants: EmptyVoidFunction;
}) => {
  const { participantId, fetchAllParticipants } = props;

  const { Dialog, onOpen, onClose } = useConfirmationDialog({
    headerText: 'Отменить регистрацию',
    bodyText: 'Вы точно хотите отменить регистацию?',
    confirmationButtonText: 'Продолжить',
    onConfirmClick: async () => {
      if (participantId) {
        const res = await RegistrationService.transferToAwaitingParticipants(participantId);
        if (res) {
          Toasters.success('Участник успешно переведен в список ожидания');
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
        Отменить регистрацию
      </Button>
      <Dialog />
    </>
  );
};

export default TransferToAwaitingParticipants;