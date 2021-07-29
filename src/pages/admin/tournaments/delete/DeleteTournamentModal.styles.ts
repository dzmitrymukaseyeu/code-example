import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: 283,
    minHeight: 90,
  },
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
}));

export default useStyles;