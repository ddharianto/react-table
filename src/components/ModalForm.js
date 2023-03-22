import React, { useState } from 'react';
import { Modal, Box, Button, Typography } from '@mui/material';

const ModalForm = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
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
        <h2 id="parent-modal-title">Bagikan link ini pada teman Anda</h2>

        <Button onClick={handleClose}>Close</Button>
      </Box>
    </Modal>
  );
};

export default ModalForm;
