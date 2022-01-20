import React, {useState} from 'react';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';


const initialState = {
    description: '',
    amount: '',
}

const WithDrawalRequest = () => {

    const [formData, setFormData] = useState(initialState);

    const [ currency, setCurrency] = useState("INR");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name] : e.target.value });
    }

    const withdrawalFunds = async () => {
        const val = web3.utils.toWei(totalDonations.toString());
        const x = await instance.methods.withdraw().send({
          from: accounts[0],
        })
        console.log(x)
        alert(`Funds Withdrawn!`)
    }

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '25%'
                }}
            >
                
                    <Typography component="h1" variant="h5">
                        Create a Witdrawal Request
                    </Typography>

                    <form>
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            multiline
                            rows={4}
                            fullWidth
                            name="description"
                            value={formData.description}
                            label="Request Description"
                            id="description"
                            onChange={handleChange}   
                        />

                        <TextField 
                            sx={{mt: 3}}
                            value={formData.amount} 
                            name="amount"
                            onChange={handleChange} 
                            label={`Donation in ${currency}`} 
                            size="small" 
                        />

                        <FormControl sx={{width: 150}}>
                            <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                            <Select
                                label="Currency"
                                onChange={(e) => setCurrency(e.target.value)}
                                value={currency}
                            >
                                <MenuItem value={"INR"}>INR</MenuItem>
                                <MenuItem value={"USD"}>USD</MenuItem>
                            </Select>
                        </FormControl>

                        {/* <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="address"
                            label="Recipient Metamask Wallet Address"
                            id="address"
                            value={formData.address}
                            onChange={handleChange}
                        /> */}

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

export default WithDrawalRequest;