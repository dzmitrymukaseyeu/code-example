import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  margin: {
    margin: 10,
  },
  flex: {
    display: 'flex',
    flexDirection: 'column',
  },
  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    minWidth: 250,
    minHeight: 130,
  },
}));

export default useStyles;