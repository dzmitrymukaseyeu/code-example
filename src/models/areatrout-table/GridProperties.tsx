import Participant from '../Participant';
import ColumnMetadata from './ColumnMetadata';

interface GridProperties {
  columns: ColumnMetadata[];
  rows: any;
  onFilterChanged?: (data: Participant[], text: string) => void;  // eslint-disable-line
  areActionsAvailable?: boolean
  className?: string
  toggleSortOrder?: any
  isThirdSortClickAllowed?: boolean;
  isPaging?: boolean;
}

export default GridProperties;