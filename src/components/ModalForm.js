import React, { Fragment, useState } from 'react';
import Input from './Input';
import {
  Button,
  Modal,
  Box,
  Grid,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  FormLabel,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from '@mui/material';
import COLOR from '../COLOR_MOCK_DATA.json';
import CARS from '../CARS_MOCK_DATA.json';

const ModalForm = ({ open, setOpen, isEdit, setForm, form, cars, setCars }) => {
  let arr = [];
  CARS.map((el) => {
    return cars !== arr ? arr.push(cars.includes(el.name)) : false;
  });

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    if (e.target.checked) {
      setForm({
        ...form,
        [e.target.name]:
          e.target.name === 'cars'
            ? [...form.cars, e.target.value]
            : e.target.value,
      });
    } else {
      const remove_car = form.cars.filter((el) => el !== e.target.value);
      setForm({
        ...form,
        [e.target.name]:
          e.target.name === 'cars' ? [...remove_car] : e.target.value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.cars.length === 0) {
      alert('Fill all the required input!');
    }
    console.log(form);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
        }}
      >
        <h2 id="parent-modal-title">
          {isEdit ? `Editing ${form.first_name}'s Data` : 'Add New Data'}
        </h2>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Input
              name="first_name"
              label="First Name"
              handleChange={handleChange}
              value={form.first_name}
            />
            <Input
              name="last_name"
              label="Last Name"
              handleChange={handleChange}
              value={form.last_name}
            />
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              value={form.email}
              type="email"
            />
            <Grid item xs={12}>
              <FormControl required sx={{ width: 200 }}>
                <InputLabel>Favourite Color</InputLabel>
                <Select
                  name="color"
                  defaultValue={isEdit ? form.color : 'Blue'}
                  label="Favourite Color"
                  onChange={handleChange}
                >
                  {COLOR.map((el, index) => {
                    return (
                      <MenuItem key={index} value={el.color}>
                        {el.color}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormLabel required>{`Desired Car(s): `}</FormLabel>
              <FormGroup row={true}>
                {CARS.map((el, index) => {
                  return (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          name="cars"
                          onChange={handleChange}
                          defaultChecked={arr[index]}
                          value={el.name}
                        />
                      }
                      label={el.name}
                    />
                  );
                })}
              </FormGroup>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, maxWidth: 150, mr: 1 }}
          >
            Save
          </Button>
          <Button
            onClick={handleClose}
            fullWidth
            variant="outlined"
            color="error"
            sx={{ mt: 3, maxWidth: 150 }}
          >
            CANCEL
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalForm;
