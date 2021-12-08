import React, { useState, useEffect } from 'react';
import FactoryContract from "./contracts/FundraiserFactory.json";
import getWeb3 from "./getWeb3";
import Web3 from 'web3'

import { Grid, Typography } from '@mui/material';
import NewFundraiser from './components/NewFundraiser/NewFundraiser';
import ActiveFundraisers from './components/ActiveFundraisers/ActiveFundraisers';

const App = () => {
  const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
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
        setAccounts(accounts);

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

  

  const createFundraiser = async () => {
    await instance.methods.createFundraiser(
      fundraiser.name,
      fundraiser.imageUrl,
      fundraiser.description,
      fundraiser.beneficiary
    ).send({ from: accounts[0] })

    alert('Successfully created fundraiser')
  }

  useEffect(() => {
    getFundraisers();
  },[createFundraiser])

  const getFundraisers = async () => {
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

  return (
    <>
      <Grid container>
        <Typography variant="h3">Make A Difference</Typography>
        <NewFundraiser fundraiser={fundraiser} setFundraiser={setFundraiser} createFundraiser={createFundraiser} />
      </Grid>
      <ActiveFundraisers fundraisers={fundraisers} />
    </>
  )
}

export default App
