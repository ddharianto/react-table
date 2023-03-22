import React from 'react';
import { useAsyncDebounce } from 'react-table';
import { TextField, Alert } from '@mui/material';

function GlobalFilter({
  globalFilter,
  setGlobalFilter,
  pageSize,
  setPageSize,
  pages,
  rows,
  count,
}) {
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        minWidth: 400,
      }}
    >
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        focused
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
          setPageSize(Number(count));
        }}
        sx={{
          minWidth: 200,
          marginRight: 1,
          color: '#003c6c',
        }}
      />
      {value !== undefined && value !== '' ? (
        <Alert
          severity={rows.length > 0 ? 'success' : 'error'}
          sx={{ minWidth: 100, marginRight: 1 }}
        >
          Result:{' '}
          <strong>{pages > 1 ? pageSize + '+ ' : rows.length + ' '}</strong>
          data found out of <strong>{count}</strong>
        </Alert>
      ) : (
        <Alert severity="info">
          {' '}
          Result: <strong>{count}</strong> data
        </Alert>
      )}
    </div>
  );
}

export default GlobalFilter;
