import React, { useState, useCallback } from 'react';
import ConfirmationDialog from './ConfirmationDialog';
import { EmptyVoidFunction } from '../../utils/types';
import AreatroutModal from '../modal/modal';

export default function useConfirmationDialog(props: {
  headerText: string;
  bodyText: string;
  confirmationButtonText: string;
  onConfirmClick: EmptyVoidFunction;
}) {
  const {
    headerText, bodyText, confirmationButtonText, onConfirmClick,
  } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => {
    setIsOpen(true);
  };
  const onClose = () => {
    setIsOpen(false);
  };

  const Dialog = useCallback(
    () => (
      <AreatroutModal header={headerText} open={isOpen} setOpen={setIsOpen}>
        <ConfirmationDialog
          bodyText={bodyText}
          onConfirmClick={onConfirmClick}
          confirmationButtonText={confirmationButtonText}
        />
      </AreatroutModal>
    ),
    [isOpen],
  );

  return {
    Dialog,
    onOpen,
    onClose,
  };
}