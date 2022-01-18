import React, {useState, useEffect} from 'react';
import {Container, TextField, Button, Link, Grid, Typography, Box} from '@mui/material'
import FactoryContract from "../../contracts/FundraiserFactory.json";

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
        
        console.log(instance);
        console.log(accounts);

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

    await instance.methods.createFundraiser(
      formData.name,
      formData.imageUrl,
      formData.description,
      formData.targetToAchieve,
      formData.beneficiary
    ).send({ from: accounts[0] })

    console.log(formData.name);
    console.log(formData.imageUrl);
    console.log(formData.description);
    console.log(formData.targetToAchieve);
    console.log(formData.beneficiary);

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
                    />

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