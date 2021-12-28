import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Box } from '@mui/material';
import ActiveFundraisers from '../ActiveFundraisers/ActiveFundraisers';
import HowItWorks from '../HowItWorks/HowItWorks';

const HomePage = ({ web3, myinstance, myaccounts, myfundraisers, getFundraisers }) => {


    const [instance, setInstance] = useState(null);
    const [fundraisers, setFundraisers] = useState([]);
    const [fundraiser, setFundraiser] = useState({
      name: '',
      imageUrl: '',
      description: '',
      beneficiary: ''
    })
    const [ accounts, setAccounts ] = useState(null);
  
    useEffect(() => {
      setInstance(myinstance)
      setAccounts(myaccounts)
      setFundraisers(myfundraisers)
    },[])



    return (
        <Container>
            <Box
                sx={{
                    flexGrow: 1
                }}
            >
            <Grid container  spacing={5} direction="column" alignItems="center">
                <Grid item xs={12}>
                    <ActiveFundraisers web3={web3} fundraisers={fundraisers} />
                    <Typography>Active Campaigns</Typography>
                </Grid>
                <Grid item xs={12}>
                    <HowItWorks />
                </Grid>
            </Grid>
            </Box>
        </Container>
    )
}

export default HomePage;