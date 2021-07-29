import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  modalWindow: {
    minWidth: 200,
  },
  buttonPadding: {
    padding: 10,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 10,
  },
}));

export default useStyles;