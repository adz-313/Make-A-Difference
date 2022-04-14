import React, { useState, useEffect } from 'react';
import { MenuItem, Select, InputLabel, FormControl, TextField, Box, Button, Typography, Modal } from '@mui/material';

function DonationModal({ donate, currency, setCurrency, setDonationAmount, setMessage, showModal, toggleModal }) {

    const [open, setOpen] = useState(showModal);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
        borderRadius: 1
    };

    useEffect(() => {
        setOpen(showModal)
    },[showModal])

  return (
    <Modal
        open={open}
        onClose={toggleModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <Typography variant='h5'>Send a message too!</Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Message"
                onChange={e => setMessage(e.target.value)}
            />
            <TextField variant="standard" sx={{ml: 1, mt: 3, width: '68%'}} onChange={(e) => setDonationAmount(e.target.value)} label={`Donation in ${currency}`} size="small" />
            <FormControl sx={{width: '25%', ml: 2, mt: 2, mb: 1}}>
                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                <Select
                    label="Currency"
                    onChange={(e) => setCurrency(e.target.value)}
                    value={currency}
                >
                    <MenuItem value={'INR'}>INR</MenuItem>
                    <MenuItem value={"USD"}>USD</MenuItem>
                </Select>
            </FormControl>
            <Button sx={{ mt:2 }} fullWidth variant="outlined" color="primary" onClick={() => donate()}>
                Donate
            </Button>
        </Box>
    </Modal>
  )
}

export default DonationModal