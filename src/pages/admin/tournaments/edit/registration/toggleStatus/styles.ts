import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
  button: {
    minWidth: 192,
    minHeight: 50,
    [theme.breakpoints.down('sm')]: {
      minWidth: 300,
      minHeight: 50,
    },
  },
  loader: {
    color: '#FFF',
  },
}));

export default useStyles;