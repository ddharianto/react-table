import React, { useState, useEffect, useMemo } from 'react';
import MaterialTable from './components/MaterialTable';
import ModalForm from './components/ModalForm';
import { Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DATA from './MOCK_DATA.json';

const App = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState([
    {
      avatar: '',
      first_name: '',
      last_name: '',
      email: '',
      color: '',
      cars: [],
    },
  ]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setData(DATA);
  }, []);

  const handleClick = (e) => {
    setOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Avatar',
        accessor: 'avatar',
      },
      {
        Header: 'First Name',
        accessor: 'first_name',
      },
      {
        Header: 'Last Name',
        accessor: 'last_name',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Favourite Color',
        accessor: 'color',
      },
      {
        Header: 'Desired Cars',
        accessor: 'cars',
      },
      {
        Header: 'Actions',
      },
    ],
    []
  );

  return (
    <div>
      <h1>React Table Example</h1>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ my: 1 }}
        onClick={handleClick}
      >
        Add New Data
      </Button>
      <ModalForm open={open} setOpen={setOpen} />
      <MaterialTable
        columns={columns}
        data={data}
        setOpen={setOpen}
        setForm={setForm}
      />
    </div>
  );
};

export default App;
