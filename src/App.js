import React, { useState, useEffect, useMemo } from 'react';
import MaterialTable from './components/MaterialTable';
import ModalForm from './components/ModalForm';
import ExportButton from './components/ExportButton';
import {
  Button,
  Stack,
  Box,
  Typography,
  Container,
  SvgIcon,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';
import DATA from './MOCK_DATA.json';

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
    color: 'Blue',
    cars: [],
    id: '',
  });
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    setData(DATA);
  }, []);

  const handleClick = (e) => {
    setIsEdit(false);
    setForm({
      avatar: '',
      first_name: '',
      last_name: '',
      email: '',
      color: 'Blue',
      cars: [],
      id: '',
    });
    setCars([]);
    setOpen(true);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Avatar',
        accessor: 'avatar',
        maxWidth: 70,
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
        maxWidth: 70,
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
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack
            direction="row"
            justifyContent="space-between"
            spacing={smDown ? 1 : 12}
          >
            <Stack spacing={1}>
              <Typography variant="h3" sx={{ minWidth: 270 }}>
                React Table
              </Typography>
              <ExportButton data={data} columns={columns} />
            </Stack>
            <div>
              <Button
                onClick={handleClick}
                size={'medium'}
                startIcon={
                  <SvgIcon fontSize="small">
                    <LibraryAddIcon />
                  </SvgIcon>
                }
                variant="contained"
                sx={{ minWidth: 150, height: '50%' }}
              >
                Add New Data
              </Button>
            </div>
          </Stack>
          <ModalForm
            open={open}
            setOpen={setOpen}
            isEdit={isEdit}
            setForm={setForm}
            form={form}
            cars={cars}
            data={data}
            setData={setData}
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
        </Stack>
      </Container>
    </Box>
  );
};

export default App;
