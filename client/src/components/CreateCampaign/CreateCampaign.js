import React, {useState, useEffect} from 'react';
import {Radio, FormControlLabel, RadioGroup, FormLabel, Container, TextField, Typography, Box, FormControl, InputLabel, Select, MenuItem} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton';
import FactoryContract from "../../contracts/FundraiserFactory.json";
import { createDrive } from '../../api/index';
import BigNumber from "bignumber.js";


// const cc = require('cryptocompare');


const CreateCampaign = ({ web3}) => {

    const [formData, setFormData] = useState({
      name: '',
      imageUrl: '',
      description: '',
      targetToAchieve: '',
      category: '',
      beneficiary: '',
      isRequestBased: false
    });
    const [instance, setInstance] = useState(null);  
    const [accounts, setAccounts] = useState(null); 
    const [currency, setCurrency] = useState('INR');
    const [loading, setLoading] = useState(false);
    const [ exchangeRate, setExchangeRate ] = useState({
      'INR': 211822.19,
      'USD': 2572.38
  });
    
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
        
        setFormData({ ...formData, beneficiary: accounts[0] });

        // const exchangeRate = await cc.price('ETH', ['INR', 'USD']);
        // setExchangeRate(exchangeRate);


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
    setLoading(true);
    const ethTotal = formData.targetToAchieve/ exchangeRate[currency];
    const amountToRaise = web3.utils.toWei(ethTotal.toString());
    
    const resp = await instance.methods.createFundraiser(
      formData.isRequestBased,
      formData.name,
      formData.imageUrl,
      formData.description,
      formData.category,
      amountToRaise,
      formData.beneficiary
    ).send({ from: accounts[0] });
    
    const driveAddress= resp.events.FundraiserCreated.returnValues.fundraiser;

    const categoryConvert = {
      'Healthcare': 0,
      'Animals': 1,
      'Art and culture': 2,
      'Community development': 3,
      'Environment': 4,
      'Education': 5,
      'Human services': 6,
      'Religion': 7
    }

    let exp_amt = 0;
    if(currency !== 'INR') {
      exp_amt = ethTotal * exchangeRate['INR'];
      exp_amt = exp_amt.toFixed(0);
    } else {
      exp_amt = formData.targetToAchieve;
    }

    const serverDrive = {
      address: driveAddress,
      name: formData.name,
      description: formData.description,
      expected_amount: exp_amt,
      amount_raised: 0,
      donation_count: 0,
      owner_id: accounts[0],
      status: 0,
      category: categoryConvert[formData.category],
      imageUrl: formData.imageUrl,
      state: "Maharashtra",
      size: 0
    }
    await createDrive(serverDrive);
    alert('Successfully created fundraiser');
    clear();
    setLoading(false);
  }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '25%',
                    marginBottom: '10%'
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

                    <FormControl fullWidth sx={{mt:2}}>
                      <InputLabel id="category-select">Category</InputLabel>
                      <Select
                        labelId="category-select"
                        value={formData.category}
                        label="Category"
                        name="category"
                        onChange={handleChange}
                      >
                        <MenuItem value={'Healthcare'}>Healthcare</MenuItem>
                        <MenuItem value={'Animals'}>Animals</MenuItem>
                        <MenuItem value={'Art and culture'}>Art and culture</MenuItem>
                        <MenuItem value={'Community development'}>Community development</MenuItem>
                        <MenuItem value={'Environment'}>Environment</MenuItem>
                        <MenuItem value={'Education'}>Education</MenuItem>
                        <MenuItem value={'Human services'}>Human services</MenuItem>
                        <MenuItem value={'Religion'}>Religion</MenuItem>
                      </Select>
                    </FormControl>

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
                        sx={{mt: 3, width: '70%', mb: 2}}
                    />
                    <FormControl sx={{width: '25%', ml: 2, mt: 3, mb: 2}}>
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

                    <FormControl>
                      <FormLabel>Type</FormLabel>
                      <RadioGroup
                        row
                        name="isRequestBased"
                        onChange={handleChange}
                      >
                        <FormControlLabel value="true" control={<Radio />} label="Request based" />
                        <FormControlLabel value="false" control={<Radio />} label="Direct withdrawal" />
                      </RadioGroup>
                    </FormControl>

                    <LoadingButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      loading={loading}
                      onClick={(e) => createFundraiser(e)}
                      sx={{mt: 1}}
                    >
                        Submit
                    </LoadingButton>

                </form>
            </Box>
        </Container>
    )
}

export default CreateCampaign;