import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0 20px 20px 20px',
  },
  contentTitle: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 16,
  },
  contentButton: {
    margin: '0 auto',
  },
}));

export default useStyles;