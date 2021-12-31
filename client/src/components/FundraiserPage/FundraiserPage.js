import React, { useEffect, useState } from 'react';
import FundraiserContract from "../../contracts/Fundraiser.json";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { useParams } from 'react-router-dom';
const cc = require('cryptocompare');

const FundraiserPage = ({ web3 }) => {
    const params = useParams();

    const [isLoading, setIsLoading] = useState(true);
    const [ instance, setInstance] = useState(null);
    const [ beneficiary, setBeneficiary] = useState(null);
    const [ fundName, setFundname ] = useState(null);
    const [ description, setDescription ] = useState(null);
    const [ targetAmount, setTargetAmount ] = useState(null);
    const [ minimumContribution, setMinimumContribution ] = useState(null);
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

    const [request, setRequest] = useState({
        description: '',
        value: '',
        recipient: ''
    });

    const [request, setRequest] = useState({
        name: '',
        imageUrl: '',
        description: '',
        // minimumContribution: '',
        targetAmount: '',
        beneficiary: ''
      });

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
            // setMinimumContribution(minimumContribution);
            setTargetAmount(targetAmount);
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
        if(params.id && web3) {
            init(params.id)
            setIsLoading(false);
        }
    },[])

    const donate = async () => {
        const ethTotal = donationAmount/ exchangeRate[currency];
        const donation = web3.utils.toWei(ethTotal.toFixed(18).toString());
        await instance.methods.donate().send({
            from: accounts[0],
            value: donation,
            gas: 650000
        });
    }

    const withdrawFunds = async index => {
        const x = await instance.methods.finalizeRequest(index).send({
          from: accounts[0],
        });
        alert(`Funds Withdrawn!`)
    }

    const createRequest = async () => {
        request.recipient = beneficiary;
        const ethTotal = request.value/ exchangeRate[currency];
        const withdrawAmount = web3.utils.toWei(ethTotal.toFixed(18).toString());
        await instance.methods.createRequest(
            request.description,
            withdrawAmount,
            request.recipient
        ).send({ from: accounts[0] });
    }

    const approveRequest = async index => {
        await instance.methods.approveRequest(index).send({ from: accounts[0] });
    }

    return (
        <div>
            <Grid container direction="row" marginTop="1rem">
                <Grid item sx={{padding: 2}} md={6} lg={8}>
                    <img src={imageURL} height={250} style={{'marginLeft': '17rem', 'marginTop': '2rem', 'marginBottom': '2rem'}}/>
                    <Typography variant="h4">{fundName}</Typography>
                    <Typography sx={{mt: 1, mb: 1}} variant="body2" color="textSecondary" component="p">{ description }</Typography>
                    <Typography sx={{color: '#3d5afe'}} variant="h6" color="textSecondary" component="h5">Total Money Raised: { exchangeRate ? (totalDonations * exchangeRate[currency]).toFixed(0)  : 'Loading...'} {currency === 'INR' ? '₹' : '$'}</Typography>
                    <Typography variant="h6" color="textSecondary" component="h5">Target: { target }</Typography>
                </Grid>
                <Grid item md={6} lg={4} >
                    <Paper sx={{padding: 2}}>
                        <Typography variant='h6'>Donate Now</Typography>
                        <TextField variant="standard" sx={{mt: 3, width: '70%'}} onChange={(e) => setDonationAmount(e.target.value)} label={`Donation in ${currency}`} size="small" />
                        <FormControl sx={{width: '25%', ml: 2, mt: 2}}>
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
                        <Button sx={{mt: 3, width: '90%', ml: 3}} variant="outlined" onClick={() => donate()}>Submit</Button>
                    </Paper>
                    {isOwner &&
                        <Paper sx={{padding: 2, mt: 2}}>
                            <Typography variant='h6'>Withdraw Request</Typography>
                            <TextField fullWidth variant="standard" onChange={(e) => setRequest({...request, description: e.target.value})} label='Description' />
                            <TextField fullWidth variant="standard" onChange={(e) => setRequest({...request, value: e.target.value})} label='Value' />
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={createRequest}
                                sx={{mt: 3, width: '90%', ml: 3}}
                            >
                                Create Request
                            </Button>
                        </Paper>
                    }
                </Grid>
            </Grid>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Value</TableCell>
                        <TableCell align="right">Approver Count</TableCell>
                        <TableCell align="right">Complete</TableCell>
                        <TableCell align="right">Approve</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        {requests ? requests.map((req, index) => (
                            <TableRow>
                                <TableCell>{req.description }</TableCell>
                                <TableCell align="right">{exchangeRate ? (web3.utils.fromWei(req.value, 'ether') * exchangeRate[currency]).toFixed(0) : 'Loading...'}</TableCell>
                                <TableCell align="right">{req.approvalCount}</TableCell>
                                <TableCell align="right">{req.complete ? 'Completed' : 'Pending'}</TableCell>
                                {isApprover && <TableCell align="right"><Button disabled={!isApprover || req.complete} variant="contained" onClick={() => approveRequest(index)}>Approve</Button></TableCell>}
                                {isOwner && <TableCell align="right"><Button disabled={(donationsCount && req.approvalCount < donationsCount/2) || req.complete} variant="contained" onClick={() => withdrawFunds(index)}>Withdraw</Button></TableCell>}
                            </TableRow>
                        )) : 'Loading...'}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default FundraiserPage
