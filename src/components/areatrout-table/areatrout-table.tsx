import React, {
  useRef, useState, forwardRef
} from 'react';
import clsx from 'clsx';
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  LastPage,
  Remove,
  FirstPage,
  SaveAlt,
  Search,
  ViewColumn,
} from '@material-ui/icons';
import MaterialTable from '@material-table/core';
import { MTableBody } from 'material-table';
import useStyles from './areatrout-table.styles';
import ColumnMetadata from '../../models/areatrout-table/ColumnMetadata';
import GridProperties from '../../models/areatrout-table/GridProperties';

const tableIcons = {
  Add: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <AddBox {...props} ref={ref} />
  )),
  Check: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Check {...props} ref={ref} />
  )),
  Clear: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Clear {...props} ref={ref} />
  )),
  Delete: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <DeleteOutline {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Edit {...props} ref={ref} />
  )),
  Export: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <SaveAlt {...props} ref={ref} />
  )),
  Filter: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <FilterList {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <FirstPage {...props} ref={ref} />
  )),
  LastPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <LastPage {...props} ref={ref} />
  )),
  NextPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ChevronRight {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Clear {...props} ref={ref} />
  )),
  Search: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Search {...props} ref={ref} />
  )),
  SortArrow: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ArrowDownward {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <Remove {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props, ref: React.Ref<SVGSVGElement>) => (
    <ViewColumn {...props} ref={ref} />
  )),
};

const transformColumns = (array: ColumnMetadata[]) => array.map((item: ColumnMetadata) => {
  const column = {
    field: item.fieldName,
    title: item.displayName,
    sorting: item.allowSortring != null ? item.allowSortring : true,
    filtering: item.allowSearch != null ? item.allowSearch : true,
    render: item.render,
    defaultSort: item.defaultSort,
    customSort: item.customSort,
  };
  return column;
});

const defaultProps = {
  onFilterChanged: () => { },
  areActionsAvailable: false,
  className: '',
  toggleSortOrder: () => { },
  isThirdSortClickAllowed: true,
  isPaging: true,
};

export default function AreatroutTable({
  columns, rows, className, areActionsAvailable, onFilterChanged, toggleSortOrder, isThirdSortClickAllowed, isPaging
}: GridProperties) {
  const newColumns = transformColumns(columns);
  const classes = useStyles();
  const [filtering, setFiltering] = useState(false);
  const tableRef = useRef<any>();
  const resetPagingParameters = () => {
    tableRef.current?.onChangePage(null, 0);
  };
  let rowPerPage = null;
  if (rows.length > 19) {
    rowPerPage = 20;
  } else if (rows.length < 6) {
    rowPerPage = 5;
  } else rowPerPage = 10;

  return (
    <div className={className ? clsx(className, classes.root) : classes.root}>
      <MaterialTable
        onOrderChange={(columnId: number, value: string) => toggleSortOrder && toggleSortOrder(columnId, value)}
        onSearchChange={() => onFilterChanged && onFilterChanged(tableRef.current?.state.data, tableRef.current?.state.searchText)}
        tableRef={tableRef}
        icons={tableIcons}
        columns={newColumns}
        data={rows}
        options={{
          filtering,
          search: true,
          sorting: true,
          showTitle: false,
          thirdSortClick: isThirdSortClickAllowed,
          pageSize: rowPerPage,
          paging: isPaging,
          rowStyle: (rowData) => (rowData.rowStyles)
        }}
        localization={{
          toolbar: {
            exportTitle: 'Выгрузить',
            exportAriaLabel: 'Выгрузить',
            searchTooltip: 'Поиск',
            searchPlaceholder: 'Поиск',
          },
          body: {
            emptyDataSourceMessage: 'Нет данных',
            filterRow: {
              filterTooltip: 'Фильтр',
            },
          },
          pagination: {
            labelDisplayedRows: '{from}-{to} из {count}',
            labelRowsSelect: 'строк',
            labelRowsPerPage: 'Количество на странице:',
            firstAriaLabel: 'Первая страница',
            firstTooltip: 'Первая страница',
            previousAriaLabel: 'Предыдущая страница',
            previousTooltip: 'Предыдущая страница',
            nextAriaLabel: 'Следующая страница',
            nextTooltip: 'Следующая страница',
            lastAriaLabel: 'Последняя страница',
            lastTooltip: 'Последняя страница',
          },
        }}
        actions={[
          {
            icon: () => <FilterList />,
            hidden: areActionsAvailable,
            tooltip: 'Включить фильтр',
            isFreeAction: true,
            onClick: () => {
              setFiltering(!filtering);
            },
          },
        ]}
        components={{
          Body: (props: any) => (
            <MTableBody
              {...props}
              onFilterChanged={(columnId: any, value: any) => {
                if (tableRef.current.state.currentPage! === 0) {
                  props.onFilterChanged(columnId, value);
                } else {
                  resetPagingParameters();
                }
              }}
            />
          ),
        }}
      />
    </div>
  );
}

AreatroutTable.defaultProps = defaultProps;