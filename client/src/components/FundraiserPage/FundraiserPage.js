import React, { useEffect, useState } from 'react';
import FundraiserContract from "../../contracts/Fundraiser.json";
import Web3 from 'web3';
import { Typography, TextField, Button, Grid } from '@mui/material';

import { useParams } from 'react-router-dom';
const cc = require('cryptocompare')

const FundraiserPage = () => {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))

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

    const init = async (fundraiser) => {
        try {
            const instance = new web3.eth.Contract(
                FundraiserContract.abi,
                fundraiser
            );
            const exchangeRate = await cc.price('ETH', ['INR'])

            const accounts = await web3.eth.getAccounts();
            const name = await instance.methods.name().call();
            const description = await instance.methods.description().call();
            const imageURL = await instance.methods.imageURL().call();
            const totalDonations = await instance.methods.totalDonations().call();
            
            setExchangeRate(exchangeRate.INR);
            setAccounts(accounts);
            setInstance(instance);
            setFundname(name);
            setDescription(description);
            setImageURL(imageURL);

            console.log(exchangeRate.INR)

            const eth = web3.utils.fromWei(totalDonations, 'ether')
            setTotalDonations(eth);

          }
        catch(error) {
        alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
        }
    }

    useEffect(() => {
        if(params.id) init(params.id)
    },[])

    const donate = async () => {
        const ethTotal = donationAmount/exchangeRate;
        const donation = web3.utils.toWei(ethTotal.toFixed(15).toString())
        await instance.methods.donate().send({
            from: accounts[0],
            value: donation,
            gas: 650000
        })
        //console.log(web3.utils.fromWei(donation, 'ether') * exchangeRate)
    }

    return (
        <div>
            <Grid container direction="row" marginTop="1rem">
                <Grid>
                    <img src={imageURL} height={250}/>
                </Grid>
                <Grid>
                    <Typography variant="h6">{fundName}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{ description }</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">Total Money Raised: { Math.ceil(totalDonations * exchangeRate) } ₹</Typography>
                </Grid>
            </Grid>
            <TextField sx={{mt: 3}} onChange={(e) => setDonationAmount(e.target.value)} label="Donation in INR" size="small" />
            <Button sx={{mt: 3}} variant="outlined" onClick={() => donate()}>Submit</Button>
        </div>
    )
}

export default FundraiserPage
