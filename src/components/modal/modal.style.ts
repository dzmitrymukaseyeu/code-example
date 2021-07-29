import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
  closeButton: {
    marginLeft: 'auto',
    top: theme.spacing(1),
    right: theme.spacing(1),
    color: theme.palette.grey[500],
    height: 50,
  },
  modal: {
    '& .MuiDialog-paperWidthSm': {
      width: 600,
    },
  }
}));

export default useStyles;