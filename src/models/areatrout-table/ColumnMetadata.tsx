import { sortingType } from '../../enum';

interface ColumnMetadata {
  displayName: string | JSX.Element;
  fieldName: string;
  allowSortring?: boolean;
  allowSearch?: boolean;
  render?: any;
  defaultSort?: sortingType.desc | sortingType.asc;
  customSort?: (a: any, b: any) => number; // eslint-disable-line
}

export default ColumnMetadata;