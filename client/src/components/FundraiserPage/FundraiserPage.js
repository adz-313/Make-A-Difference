import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FundraiserContract from "../../contracts/Fundraiser.json";
import { Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Container, Box, Grow, Card, CardContent, CardHeader, Avatar, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { grey } from '@mui/material/colors';
import WithDrawalRequest from '../WithDrawals/WithDrawalRequest';
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
    const [ beneficiary, setBeneficiary] = useState(null);
    const [ fundName, setFundname ] = useState(null);
    const [ description, setDescription ] = useState(null);
    const [ imageURL, setImageURL ] = useState(null);
    const [ donationAmount, setDonationAmount] = useState(null);
    const [ totalDonations, setTotalDonations ] = useState(null);
    const [ target, setTarget ] = useState(null);
    const [ accounts, setAccounts ] = useState(null);
    const [ exchangeRate, setExchangeRate ] = useState(null);
    const [ donationsCount, setDonationsCount ] = useState(null);
    const [ currency, setCurrency ] = useState('INR');
    const [ isOwner, setIsOwner ] = useState(false);
    const [ isApprover, setIsApprover ] = useState(true);
    const [ requests, setRequests ] = useState([]);

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
            const target = await instance.methods.targetToAchieve().call();
            const totalDonations = await instance.methods.totalDonations().call();
            const donationsCount = await instance.methods.donationsCount().call();
            const beneficiary = await instance.methods.beneficiary().call();

            setDonationsCount(donationsCount);
            
            setExchangeRate(exchangeRate);
            setAccounts(accounts);
            setInstance(instance);
            setFundname(name);
            setDescription(description);
            setImageURL(imageURL);
            setBeneficiary(beneficiary);
            setTarget(target);
            
            const eth = web3.utils.fromWei(totalDonations, 'ether')
            setTotalDonations(eth);

            const isOwner = await instance.methods.owner().call();

            if(isOwner === accounts[0]) {
                setIsOwner(true)
            }

            const isApprover = await instance.methods.approvers(accounts[0]).call();
            setIsApprover(isApprover);
            
            const count = await instance.methods.getRequestsCount().call();
            for(let i=0; i<count; i++) {
                const req = await instance.methods.requests(i).call();
                setRequests(requests => [ ...requests, req]);
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

    return (
       <Container>
            <Box
                sx={{
                    flexGrow: 1,
                    marginTop: "5rem",
                    
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
                            <Card
                                sx={{
                                    position: "fixed"
                                }}
                            >
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
                                    
                                </CardActions>
                                <CardActions>
                                 
                                        {
                                            isOwner &&
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                component={Link} to={`/fundraiser/${params.id}/withdrawal/new`}
                                            >
                                                Withdraw
                                            </Button>
                                        }
                                    
                                    </CardActions>
                                    <CardActions>
                                    <div>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            color="primary"
                                        >
                                            View WithDrawal Requests
                                        </Button>
                                    </div>
                                    <div>
                                        <Button
                                            fullWidth
                                            variant="outlined"
                                            color="primary"
                                        >See All Donations</Button>
                                    </div>

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