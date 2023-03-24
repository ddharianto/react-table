import React from 'react';
import { TextField, Grid } from '@mui/material';

const Input = ({ name, handleChange, label, value }) => (
  <Grid item xs={12}>
    <TextField
      name={name}
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      autoFocus
      label={label}
      value={value}
    />
  </Grid>
);

export default Input;
