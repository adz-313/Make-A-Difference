import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import getWeb3 from '../../getWeb3';
import Web3 from 'web3';
import FundraiserContract from "../../contracts/Fundraiser.json";
import { Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Container, Box, Grow, Card, CardContent, CardHeader, Avatar, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { grey } from '@mui/material/colors';
const cc = require('cryptocompare');


const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#1a90ff' : '#308fe8',
    },
  }));


const FundraiserPage = ({ web3 }) => {
    const params = useParams();

    const [ instance, setInstance] = useState(null);
    const [ address, setAddress] = useState(null);
    const [ fundName, setFundname ] = useState(null);
    const [ description, setDescription ] = useState(null);
    const [ imageURL, setImageURL ] = useState(null);
    const [ donationAmount, setDonationAmount] = useState(null);
    const [ totalDonations, setTotalDonations ] = useState(null);
    const [ accounts, setAccounts ] = useState(null);
    const [ exchangeRate, setExchangeRate ] = useState(null);
    const [ currency, setCurrency ] = useState('INR');
    const [ isOwner, setIsOwner ] = useState(false);

    const init = async (fundraiser) => {
        try {
            const instance = new web3.eth.Contract(
                FundraiserContract.abi,
                fundraiser
            );
            const exchangeRate = await cc.price('ETH', ['INR', 'USD'])

            const accounts = await web3.eth.getAccounts();
            const name = await instance.methods.name().call();
            const description = await instance.methods.description().call();
            const imageURL = await instance.methods.imageURL().call();
            const totalDonations = await instance.methods.totalDonations().call();
            const benef = await instance.methods.beneficiary().call();
            
            setExchangeRate(exchangeRate);
            setAccounts(accounts);
            setInstance(instance);
            setFundname(name);
            setDescription(description);
            setImageURL(imageURL);
            console.log(instance)
            const eth = web3.utils.fromWei(totalDonations, 'ether')
            setTotalDonations(eth);

            const isOwner = await instance.methods.owner().call();

            if (isOwner === accounts[0]) {
                setIsOwner(true)
            }

          }
        catch(error) {
        alert(
            `Failed to load web3, accounts, or contract. Check console for details. ${error}`,
        );
        console.error(error);
        }
    }

    useEffect(() => {
        if(web3 && params.id) init(params.id)
    },[])

    const donate = async () => {
        const ethTotal = donationAmount/ exchangeRate[currency];
        const donation = web3.utils.toWei(ethTotal.toFixed(15).toString())
        await instance.methods.donate().send({
            from: accounts[0],
            value: donation,
            gas: 650000
        })
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
        // <div>
        //     <Grid container direction="row" marginTop="1rem">
        //         <Grid md={6} lg={4}>
        //             <img src={imageURL} height={250}/>
        //         </Grid>
        //         <Grid md={6} lg={8}>
        //             <Typography variant="h3">{fundName}</Typography>
        //             <Typography variant="body2" color="textSecondary" component="p">{ description }</Typography>
        //             <Typography variant="h5" color="textSecondary" component="h5">Total Money Raised: { exchangeRate ? (totalDonations * exchangeRate[currency]).toFixed(2)  : 'Loading...'} {currency === 'INR' ? '₹' : '$'}</Typography>
        //         </Grid>
        //     </Grid>
        //     <TextField sx={{mt: 3}} onChange={(e) => setDonationAmount(e.target.value)} label={`Donation in ${currency}`} size="small" />
        //     <FormControl sx={{width: 150}}>
        //         <InputLabel id="demo-simple-select-label">Currency</InputLabel>
        //         <Select
        //             label="Currency"
        //             onChange={(e) => setCurrency(e.target.value)}
        //             value={currency}
        //         >
        //             <MenuItem value={'INR'}>INR</MenuItem>
        //             <MenuItem value={"USD"}>USD</MenuItem>
        //         </Select>
        //     </FormControl>
        //     <Button sx={{mt: 3}} variant="outlined" onClick={() => donate()}>Submit</Button>
        //     {isOwner &&
        //         <Button
        //             variant="contained"
        //             color="primary"
        //             onClick={withdrawalFunds}
        //         >
        //             Withdrawal
        //         </Button>
        //     }
        // </div>
        <Container>
            <Box
                sx={{
                    flexGrow: 1,
                    marginTop: "3rem",
                    
                }}
            >
                <Grid container spacing={5} direction="row">
                    <Grid item xs={12} lg={8}>
                        <Typography variant="h3">{fundName}</Typography>
                        <img src={imageURL}  width={600} height={300}/>
                        <Typography variant="body1" color="textprimary" marginTop="1rem">{ description }</Typography>
                    </Grid>
                    <Grid item xs={12} lg={4}>
                        <Box
                            sx={{
                                minWidth: 400,
                                
                            }}
                        >
                            <Card>
                                <CardContent>
                                    <Typography color="text.primary" variant="h5" component="div">$125 raised out of $500</Typography>
                                    <BorderLinearProgress variant="determinate" value={30} />
                                </CardContent>
                                <CardHeader 
                                    avatar={
                                        <Avatar sx={{ bgcolor: grey }} aria-label="user">
                                            A
                                        </Avatar>
                                    }
                                    title="Alex"
                                    subheader="$20"
                                />
                                <hr/>
                                <CardHeader 
                                    avatar={
                                        <Avatar sx={{ bgcolor: grey }} aria-label="user">
                                            A
                                        </Avatar>
                                    }
                                    title="Tom"
                                    subheader="$40"
                                />
                                <CardActions>

                                    {
                                        !isOwner &&
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={() => donate()}
                                        >Donate Now
                                        </Button>
                                    }
                                    {
                                        isOwner &&
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={withdrawalFunds}
                                        >
                                            Withdraw
                                        </Button>
                                    }

                                    <Button>See All Donations</Button>

                                </CardActions>

                            </Card>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default FundraiserPage
