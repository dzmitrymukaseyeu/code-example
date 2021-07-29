import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => createStyles({
  root: {
    '& .MuiTableCell-root': {
      flexDirection: 'row',
      textAlign: 'center',
    },
    '& .MuiTableCell-head': {
      backgroundColor: '#E0F2F9',
      fontWeight: 'bold',
    },
    '& .MuiTableSortLabel-root svg': {
      display: 'none',
    },
    '& .MuiTableSortLabel-root:hover svg': {
      display: 'inline-block',
    }
  },
}));

export default useStyles;