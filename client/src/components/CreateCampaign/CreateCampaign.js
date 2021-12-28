import React, {useState} from 'react';


import {Container, TextField, Button, Link, Grid, Typography, Box} from '@mui/material'


const initialState = {
    name: '',
    imageUrl: '',
    description: '',
    beneficiary: ''
}

const CreateCampaign = ({ web3, myinstance, myaccounts, myfundraisers, getFundraisers }) => {


    const [formData, setFormData] = useState(initialState);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '25%'
                }}
            >
                <Typography component="h1" variant="h5">
                    Create Campaign
                </Typography>

                <form >
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Campaign Name"
                        name="name"
                        value={formData.name}
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        multiline
                        rows={4}
                        fullWidth
                        name="description"
                        value={formData.description}
                        label="Campaign Description"
                        id="description"
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="imageUrl"
                        label="Image URL"
                        id="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="beneficiary"
                        label="Beneficiary"
                        id="beneficiary"
                        value={formData.beneficiary}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                       
                    >
                        Submit
                    </Button>

                </form>
            </Box>
        </Container>
    )
}

export default CreateCampaign;