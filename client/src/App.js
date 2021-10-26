import React, { useState, useEffect } from 'react';
import FactoryContract from "./contracts/FundraiserFactory.json";
import getWeb3 from "./getWeb3";
import Web3 from 'web3'

import Typography from '@mui/material/Typography';
import NewFundraiser from './components/NewFundraiser';
import FundraiserCard from './components/FundraiserCard';
import { Grid } from '@mui/material';

const App = () => {
  const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
  const [instance, setInstance] = useState(null);
  const [fundraisers, setFundraisers] = useState([]);

  const getFUndraisers = async () => {
    try {
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = FactoryContract.networks[networkId];
      const accounts = await web3.eth.getAccounts();
      const instance = new web3.eth.Contract(
        FactoryContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      const funds = await instance.methods.fundraisers(10, 0).call()
        
      setFundraisers(funds)
    }
    catch(error) {
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  }

  useEffect(() => {
    const init = async() => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FactoryContract.networks[networkId];
        const instance = new web3.eth.Contract(
          FactoryContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        setInstance(instance);

        getFUndraisers();

      } catch(error) {
        // Catch any errors for any of the above operations.
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    init();
  }, []);

  return (
    <Grid container>
      <Typography variant="h3">Make A Difference</Typography>
      <NewFundraiser />
      <Typography variant="h5" margin="1rem 1rem">Active Fundraisers</Typography>
      <Grid container spacing={3}>
      {
        fundraisers.map((fundraiser) => {
          return (
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <FundraiserCard fundraiser={fundraiser} />
            </Grid>
          )
        })
      }
      </Grid>
      
    </Grid>
  )
}

export default App
