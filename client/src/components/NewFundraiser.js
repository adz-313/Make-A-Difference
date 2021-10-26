import React, { useState, useEffect } from "react";
import getWeb3 from "../getWeb3";
import FactoryContract from "../contracts/FundraiserFactory.json";
import { Typography, Button, Grid, TextField } from "@mui/material";

const NewFundraiser = () => {

  useEffect(() => {
    const init = async() => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FactoryContract.networks[networkId];
        const accounts = await web3.eth.getAccounts();
        const instance = new web3.eth.Contract(
          FactoryContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        setContract(instance)
        setAccounts(accounts)

      } catch(error) {
        alert(
          `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
      }
    }
    init();
  }, []);

  const [ name, setFundraiserName ] = useState(null)
  const [ website, setFundraiserWebsite ] = useState(null)
  const [ description, setFundraiserDescription ] = useState(null)
  const [ image, setImage ] = useState(null)
  const [ address, setAddress ] = useState(null)
  const [ contract, setContract] = useState(null)
  const [ accounts, setAccounts ] = useState(null)

  const handleSubmit = async () => {
    console.log('safgsf')
    const imageURL = image;
    const url = website;
    const beneficiary = address;

    await contract.methods.createFundraiser(
      name,
      url,
      imageURL,
      description,
      beneficiary
    ).send({ from: accounts[0] })

    alert('Successfully created fundraiser')
  }

  return (
    <Grid container direction="row" marginTop="1rem">
      <Grid direction="column" justifyContent="start" container xs={12} md={8} padding="10px">
        <Typography variant="h6" marginBottom="10px" alignSelf="center">How it works</Typography>
        <Typography variant="body1">1. Sign in to your Metamask Wallet.</Typography>
        <Typography variant="body1">2. Select fundraiser to donate to. </Typography>
        <Typography variant="body1">3. Enter amount of donation.</Typography>
        <Typography variant="body1">4. Confirm through Metamask Wallet.</Typography>
      </Grid>
      <Grid direction="column" justifyContent="space-evenly" minHeight="50vh" padding="0 2rem" container xs={12} md={4} >
        <Typography variant="h6" alignSelf="center">Create A New Fundraiser</Typography>
        <TextField onChange={(e) => setFundraiserName(e.target.value)} label="Name" size="small" />
        <TextField onChange={(e) => setFundraiserWebsite(e.target.value)} label="Website" size="small" />
        <TextField onChange={(e) => setImage(e.target.value)} label="Image URL" size="small" />
        <TextField onChange={(e) => setFundraiserDescription(e.target.value)} label="Description" size="small" />
        <TextField onChange={(e) => setAddress(e.target.value)} label="Beneficiary" size="small" />
        <Button variant="outlined" onClick={handleSubmit}>Submit</Button>
      </Grid>
    </Grid>
  )
}


export default NewFundraiser;
