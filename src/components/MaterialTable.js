import React, { Fragment } from 'react';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
} from 'react-table';
import GlobalFilter from './GlobalFilter';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableSortLabel,
  Paper,
  TableContainer,
  Button,
  Box,
  ListItem,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { visuallyHidden } from '@mui/utils';

const MaterialTable = ({ columns, data, setOpen, setForm }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canNextPage,
    canPreviousPage,
    state: { pageIndex, pageSize, globalFilter },
    setPageSize,
    setGlobalFilter,
    pageCount,
    gotoPage,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  return (
    <>
      <TableContainer
        component={Paper}
        style={{
          overflowX: 'auto',
          minHeight: 'auto',
          maxHeight: 600,
          minWidth: 800,
        }}
      >
        <Table {...getTableProps()} stickyHeader aria-label="sticky table">
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  if (column.canSort) {
                    return (
                      <TableCell
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        style={{
                          backgroundColor: '#003c6c',
                          color: '#fff',
                          fontWeight: 'bold',
                          fontSize: '18px',
                        }}
                      >
                        <TableSortLabel
                          active={column.isSorted}
                          direction={column.isSortedDesc ? 'desc' : 'asc'}
                          sx={{
                            '&.MuiTableSortLabel-root': {
                              color: 'white',
                            },
                            '&.MuiTableSortLabel-root:hover': {
                              color: 'white',
                            },
                            '&.Mui-active': {
                              color: 'white',
                            },
                            '& .MuiTableSortLabel-icon': {
                              color: 'white !important',
                            },
                          }}
                        >
                          {column.render('Header')}
                          {column.isSorted ? (
                            <Box component="span" sx={visuallyHidden}>
                              {column.isSortedDesc
                                ? 'sorted descending'
                                : 'sorted ascending'}
                            </Box>
                          ) : null}
                        </TableSortLabel>
                      </TableCell>
                    );
                  }
                  return (
                    <TableCell
                      {...column.getHeaderProps()}
                      style={{
                        backgroundColor: '#003c6c',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '18px',
                      }}
                    >
                      {column.render('Header')}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row);
              return (
                <TableRow
                  {...row.getRowProps()}
                  hover={i % 2 === 0 ? true : false}
                  sx={{ backgroundColor: i % 2 === 0 ? '#fff' : '#bbdefb' }}
                >
                  {row.cells.map((cell) => {
                    if (cell.column.Header === 'Actions') {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setOpen(true)}
                            startIcon={<BorderColorIcon />}
                            sx={{ mr: 1 }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => console.log(row.values.cars)}
                            startIcon={<DeleteIcon />}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      );
                    } else if (cell.column.Header === 'Avatar') {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          <img src={row.values.avatar} alt="avatar" />
                        </TableCell>
                      );
                    } else if (cell.column.Header === 'Desired Cars') {
                      const cars = row.values.cars;
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cars.map((el, index) => {
                            return (
                              <ListItem
                                key={index}
                                component="div"
                                disablePadding
                              >
                                <ListItemText key={index} primary={el} />
                              </ListItem>
                            );
                          })}
                        </TableCell>
                      );
                    }
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          minWidth: 800,
          marginTop: 16,
        }}
      >
        <GlobalFilter
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          pages={pageCount}
          pageSize={pageSize}
          setPageSize={setPageSize}
          count={data.length}
          rows={page}
        />
        <TablePagination
          component="div"
          count={data.length}
          page={pageIndex}
          onPageChange={(event, newPage) => {
            gotoPage(newPage);
          }}
          onRowsPerPageChange={(event) =>
            setPageSize(Number(event.target.value))
          }
          rowsPerPage={pageSize}
          rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length }]}
          nextIconButtonProps={{
            disabled: !canNextPage,
            children: 'Next page',
          }}
          backIconButtonProps={{
            disabled: !canPreviousPage,
            children: 'Previous page',
          }}
          showFirstButton
          showLastButton
          labelRowsPerPage="Rows per page:"
          labelDisplayedRows={() => `Page ${pageIndex + 1} of ${pageCount}`}
        />
      </div>
    </>
  );
};

export default MaterialTable;
