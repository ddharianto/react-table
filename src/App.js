import React, { Fragment, useState, useEffect, useMemo } from 'react';
import MaterialTable from './components/MaterialTable';
import ModalForm from './components/ModalForm';

import { Button } from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DATA from './MOCK_DATA.json';
import CARS from './CARS_MOCK_DATA.json';

const App = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [cars, setCars] = useState([]);
  const [form, setForm] = useState({
    avatar: '',
    first_name: '',
    last_name: '',
    email: '',
    color: '',
    cars: [''],
    id: '',
  });

  useEffect(() => {
    setData(DATA);
  }, []);

  const handleClick = (e) => {
    setIsEdit(false);
    setForm(0);
    setCars(['']);
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
        Header: 'Desired Car(s)',
        accessor: 'cars',
      },
      {
        Header: 'Actions',
        accessor: 'actions',
      },
    ],
    []
  );

  return (
    <div>
      <h1>React Table Example</h1>
      <Button
        variant="contained"
        startIcon={<LibraryAddIcon />}
        sx={{ my: 1 }}
        onClick={handleClick}
      >
        Add New Data
      </Button>
      <ModalForm
        open={open}
        setOpen={setOpen}
        isEdit={isEdit}
        setForm={setForm}
        form={form}
        cars={cars}
      />

      <MaterialTable
        columns={columns}
        data={data}
        setData={setData}
        setOpen={setOpen}
        setForm={setForm}
        setCars={setCars}
        setIsEdit={setIsEdit}
      />
    </div>
  );
};

export default App;
