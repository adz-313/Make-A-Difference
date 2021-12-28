import React, { useEffect, useState } from 'react';
import FundraiserContract from "../../contracts/Fundraiser.json";
import Web3 from 'web3';
import { Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

import { useParams } from 'react-router-dom';
const cc = require('cryptocompare');

const FundraiserPage = ({ web3 }) => {
    const params = useParams();

    const [isLoading, setIsLoading] = useState(true);
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
            console.log(accounts)
            setInstance(instance);
            setFundname(name);
            setDescription(description);
            setImageURL(imageURL);
            
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
        if(params.id && web3) {
            init(params.id)
            setIsLoading(false);
        }
    },[])

    const donate = async () => {
        const ethTotal = donationAmount/ exchangeRate[currency];
        const donation = web3.utils.toWei(ethTotal.toFixed(18).toString())
        await instance.methods.donate().send({
            from: accounts[0],
            value: donation,
            gas: 650000
        })
        console.log(ethTotal, donation ,totalDonations)
    }

    const withdrawalFunds = async () => {
        const val = web3.utils.toWei(totalDonations.toString());
        const x = await instance.methods.withdraw().send({
          from: accounts[0],
        })
        console.log(x)
        alert(`Funds Withdrawn!`)
    }

    if(isLoading) return <p>Loading...</p>

    return (
        <div>
            <Grid container direction="row" marginTop="1rem">
                <Grid md={6} lg={4}>
                    <img src={imageURL} height={250}/>
                </Grid>
                <Grid md={6} lg={8}>
                    <Typography variant="h3">{fundName}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{ description }</Typography>
                    <Typography variant="h5" color="textSecondary" component="h5">Total Money Raised: { exchangeRate ? (totalDonations * exchangeRate[currency]).toFixed(0)  : 'Loading...'} {currency === 'INR' ? '₹' : '$'}</Typography>
                </Grid>
            </Grid>
            <TextField sx={{mt: 3}} onChange={(e) => setDonationAmount(e.target.value)} label={`Donation in ${currency}`} size="small" />
            <FormControl sx={{width: 150}}>
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
            <Button sx={{mt: 3}} variant="outlined" onClick={() => donate()}>Submit</Button>
            {isOwner &&
                <Button
                    variant="contained"
                    color="primary"
                    onClick={withdrawalFunds}
                >
                    Withdrawal
                </Button>
            }
        </div>
    )
}

export default FundraiserPage
