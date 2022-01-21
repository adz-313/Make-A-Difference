import React, {useState, useEffect} from 'react';
import {Container, TextField, Button, Link, Grid, Typography, Box, FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import FactoryContract from "../../contracts/FundraiserFactory.json";
const cc = require('cryptocompare');

const initialState = {
    name: '',
    imageUrl: '',
    description: '',
    targetToAchieve: '',
    beneficiary: ''
}

const CreateCampaign = ({ web3}) => {

    const [formData, setFormData] = useState(initialState);
    const [instance, setInstance] = useState(null);  
    const [accounts, setAccounts] = useState(null); 
    const [currency, setCurrency] = useState('INR');
    const [ exchangeRate, setExchangeRate ] = useState(null);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    
  useEffect(() => {
    const init = async() => {
      try {
        const accounts = await web3.eth.getAccounts();

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FactoryContract.networks[networkId];
        const instance = new web3.eth.Contract(
          FactoryContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        
        setInstance(instance);
        setAccounts(accounts);
        
        const exchangeRate = await cc.price('ETH', ['INR', 'USD']);
        setExchangeRate(exchangeRate);


      } catch(error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
        console.error(error);
      }
    }
    if(web3) init();
    
  }, []);

  const clear = () => {
    setFormData({
      name: '',
      imageUrl: '',
      description: '',
      targetToAchieve: '',
      beneficiary: ''
    });
  }

  const createFundraiser = async (e) => {
    e.preventDefault();
    const ethTotal = formData.targetToAchieve/ exchangeRate[currency];
    //const amountToRaise = web3.utils.toWei(ethTotal.toFixed(18).toString());

    await instance.methods.createFundraiser(
      formData.name,
      formData.imageUrl,
      formData.description,
      ethTotal,
      formData.beneficiary
    ).send({ from: accounts[0] })

    alert('Successfully created fundraiser')
    clear()
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

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="targetToAchieve"
                        label="Target Amount"
                        id="targetToAchieve"
                        value={formData.targetToAchieve}
                        onChange={handleChange}
                        sx={{mt: 2, width: '70%', mb: 2}}
                    />
                    <FormControl sx={{width: '25%', ml: 2, mt: 2, mb: 2}}>
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

                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={(e) => createFundraiser(e)}
                    >
                        Submit
                    </Button>

                </form>
            </Box>
        </Container>
    )
}

export default CreateCampaign;