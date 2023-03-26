import React from 'react';
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
  Grid,
  Chip,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { visuallyHidden } from '@mui/utils';

const MaterialTable = ({
  columns,
  data,
  setData,
  setOpen,
  setForm,
  setCars,
  setIsEdit,
}) => {
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

  const handleEdit = (row) => {
    const { avatar, first_name, last_name, email, color, cars } = row.values;
    const id = row.original.id;
    setCars(cars);
    setIsEdit(true);
    setForm({
      avatar,
      first_name,
      last_name,
      email,
      color,
      cars,
      id,
    });
    setOpen(true);
  };

  const handleDelete = (row) => {
    const remove_data = data.filter((el) => el.id !== row.original.id);
    setData([...remove_data]);
  };

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
                  if (
                    column.canSort &&
                    column.id !== 'actions' &&
                    column.id !== 'avatar'
                  ) {
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
                        <TableCell
                          {...cell.getCellProps()}
                          sx={{ maxWidth: 200 }}
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleEdit(row)}
                            startIcon={<BorderColorIcon />}
                            sx={{ m: 0.5 }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="contained"
                            color="error"
                            onClick={() => {
                              if (
                                window.confirm(
                                  `Delete ${row.values.first_name} ${row.values.last_name}?`
                                )
                              )
                                return handleDelete(row);
                            }}
                            startIcon={<DeleteIcon />}
                            sx={{ m: 0.5 }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      );
                    } else if (cell.column.Header === 'Avatar') {
                      return (
                        <TableCell
                          {...cell.getCellProps()}
                          sx={{ maxWidth: 50 }}
                        >
                          <img src={row.values.avatar} alt="avatar" />
                        </TableCell>
                      );
                    } else if (cell.column.Header === 'Desired Car(s)') {
                      const cars = row.values.cars;
                      return (
                        <TableCell
                          {...cell.getCellProps()}
                          sx={{ maxWidth: 200 }}
                        >
                          <Grid container wrap="wrap" spacing={1}>
                            {cars.map((el, index) => {
                              return (
                                <Grid item key={index}>
                                  <Chip
                                    label={el}
                                    color="info"
                                    variant="outlined"
                                  />
                                </Grid>
                              );
                            })}
                          </Grid>
                        </TableCell>
                      );
                    } else if (cell.column.Header === 'Favourite Color') {
                      return (
                        <TableCell
                          {...cell.getCellProps()}
                          sx={{ maxWidth: 50 }}
                        >
                          {cell.render('Cell')}
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
