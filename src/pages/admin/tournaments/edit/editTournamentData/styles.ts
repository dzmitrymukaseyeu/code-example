import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
  title: {
    marginBottom: 40,
  },
  editWrapper: {
    flexWrap: 'nowrap',
  },
  link: {
    paddingLeft: 14,
  },
  linkButton: {
    alignSelf: 'baseline',
  },
  button: {
    margin: 10,
  },
  status: {
    order: 2,
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      order: 0,
      alignItems: 'flex-start',
      marginBottom: 10,
    },
  },
}));

export default useStyles;