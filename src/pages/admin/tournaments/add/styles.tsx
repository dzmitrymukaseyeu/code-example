import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => createStyles({
  editWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  description: {
    margin: '0 20px 10px 20px',
  },
  inputField: {
    boxSizing: 'border-box',
    width: 250,
    [theme.breakpoints.down('xs')]: {
      width: 285,
    },
  },
  invalid: {
    color: 'red',
  },
  button: {
    marginBottom: 10,
  },
  label: {
    boxSizing: 'border-box',
    width: '40%',
    marginRight: 'auto',
    marginBlockStart: 0,
    marginBlockEnd: 0,
    [theme.breakpoints.down('xs')]: {
      width: '100%',
    },
  },
  inputRow: {
    display: 'flex',
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
    margin: '0 20px 0 20px',
    boxSizing: 'border-box',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      gap: 0,
    },
  },
  saveButton: {
    margin: '0 auto 15px auto',
  },
  loadingWindow: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '65vh',
    minWidth: '65vh',
  },
}));

export default useStyles;