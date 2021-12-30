import React,{useState, useEffect} from "react";
import { Typography, Button, Grid, TextField } from "@mui/material";
import FactoryContract from "../../contracts/FundraiserFactory.json";

const NewFundraiser = ({ web3 }) => {
  const [instance, setInstance] = useState(null);
  const [fundraiser, setFundraiser] = useState({
    name: '',
    imageUrl: '',
    description: '',
    // minimumContribution: '',
    targetAmount: '',
    beneficiary: ''
  });
  const [ accounts, setAccounts ] = useState(null);


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

      } catch(error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
        console.error(error);
      }
    }
    if(web3) init();
    
  }, []);

  const clear = () => {
    setFundraiser({
      name: '',
      imageUrl: '',
      description: '',
      // minimumContribution: '',
      targetAmount: '',
      beneficiary: ''
    });
  }

  const createFundraiser = async () => {
    await instance.methods.createFundraiser(
      fundraiser.name,
      fundraiser.imageUrl,
      fundraiser.description,
      // fundraiser.minimumContribution,
      fundraiser.targetAmount,
      fundraiser.beneficiary
    ).send({ from: accounts[0] })

    alert('Successfully created fundraiser')
    clear()
  }

  return (
    <Grid container direction="row" marginTop="1rem" minHeight="90vh">
      <Grid direction="column" justifyContent="start" container xs={12} md={4} padding="10px">
        <Typography variant="h6" marginBottom="10px" alignSelf="center">What it is</Typography>
        <Typography variant="body1">1. Make A Difference is a new and improved fundraising app.</Typography>
        <Typography variant="body1">2. Using blockchain, it successfully eliminates any middle man so your money reaches the needy directly.</Typography>
        <Typography variant="body1">3. You get real time data of how the funds raised are being used.</Typography>
        <Typography variant="body1">4. The funds generated are also stored securely and cannot be stolen by anyone. </Typography>
      </Grid>
      <Grid direction="column" justifyContent="start" container xs={12} md={4} padding="10px">
        <Typography variant="h6" marginBottom="10px" alignSelf="center">How it works</Typography>
        <Typography variant="body1">1. Sign in to your Metamask Wallet.</Typography>
        <Typography variant="body1">2. Select fundraiser to donate to. </Typography>
        <Typography variant="body1">3. Enter amount of donation.</Typography>
        <Typography variant="body1">4. Confirm through Metamask Wallet.</Typography>
        <Typography variant="body1">Current Account: {accounts}</Typography>
      </Grid>
      <Grid direction="column" justifyContent="space-evenly" minHeight="75vh" marginTop={-1}  padding="0 2rem" paddingBottom={2} container xs={12} md={4} >
        <Typography variant="h6" alignSelf="center">Create A New Fundraiser</Typography>
        <TextField value={fundraiser.name} onChange={(e) => setFundraiser({ ...fundraiser, name: e.target.value })} label="Name" size="small" />
        <TextField value={fundraiser.imageUrl} onChange={(e) => setFundraiser({ ...fundraiser, imageUrl: e.target.value })} label="Image URL" size="small" />
        {/* <TextField value={fundraiser.minimumContribution} onChange={(e) => setFundraiser({ ...fundraiser, minimumContribution: e.target.value })} label="Minimum Contribution" size="small" /> */}
        <TextField value={fundraiser.targetAmount} onChange={(e) => setFundraiser({ ...fundraiser, targetAmount: e.target.value })} label="Target Amount" size="small" />
        <textarea style={{ minHeight:"17rem" }} value={fundraiser.description} onChange={(e) => setFundraiser({ ...fundraiser, description: e.target.value })} label="Description" size="small" />
        <TextField value={fundraiser.beneficiary} onChange={(e) => setFundraiser({ ...fundraiser, beneficiary: e.target.value })} label="Beneficiary" size="small" />
        <Button variant="outlined" onClick={() => createFundraiser()}>Submit</Button>
      </Grid>
    </Grid>
  )
}


export default NewFundraiser;
