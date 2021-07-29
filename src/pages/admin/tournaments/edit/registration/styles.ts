import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => createStyles({
  content: {
    marginBottom: 50,
  },
  title: {
    marginBottom: 20,
  },
  titleName: {
    marginRight: 20,
  },
  titleParticipants: {
    fontSize: 18,
  },
  titleParticipantsNumber: {
    marginLeft: 5,
    fontWeight: 600,
    fontSize: 24,
  },
  status: {
    order: 2,
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      order: 0,
      alignItems: 'center',
      marginBottom: 10,
    },
  },
}));

export default useStyles;