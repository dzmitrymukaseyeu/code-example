import React from 'react';
import {
  IconButton, Dialog, DialogTitle, Grid,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import useStyles from './modal.style';
import { EmptyVoidFunction } from '../../utils/types';

const defaultProps = {
  onClose: () => {},
  className: '',
};

export default function AreatroutModal(props: {
  children: JSX.Element;
  header: string;
  className?: string;
  onClose?: EmptyVoidFunction;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const {
    children, header, className, onClose, open, setOpen,
  } = props;

  const styles = useStyles();

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} className={styles.modal}>
      <Grid container direction="row" className={className}>
        <DialogTitle>{header}</DialogTitle>
        <IconButton
          aria-label="close"
          className={styles.closeButton}
          onClick={handleClose}
        >
          <CloseIcon />
        </IconButton>
      </Grid>
      {React.cloneElement(children, {
        handleClose,
      })}
    </Dialog>
  );
}

AreatroutModal.defaultProps = defaultProps;