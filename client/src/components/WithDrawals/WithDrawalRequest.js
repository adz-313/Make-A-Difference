import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Button, Container, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import FundraiserContract from "../../contracts/Fundraiser.json";
const cc = require('cryptocompare');

const WithDrawalRequest = ({ web3 }) => {

    const params = useParams();

    const [instance, setInstance] = useState(null);
    const [accounts, setAccounts] = useState(null);
    const [totalDonations, setTotalDonations] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [isApprover, setIsApprover] = useState(false);
    const [requests, setRequests] = useState(false);
    const [currency, setCurrency] = useState("INR");
    const [beneficiary, setBeneficiary] = useState(null);
    const [exchangeRate, setExchangeRate ] = useState(null);
    const [request, setRequest] = useState({
        description: '',
        value: '',
        recipient: ''
    });

    const init = async (fundraiser) => {
        try {
            const instance = new web3.eth.Contract(
                FundraiserContract.abi,
                fundraiser
            );
            const exchangeRate = await cc.price('ETH', ['INR', 'USD']);
            const accounts = await web3.eth.getAccounts();
            const beneficiary = await instance.methods.beneficiary().call();

            setInstance(instance);
            setAccounts(accounts);
            setExchangeRate(exchangeRate);
            setBeneficiary(beneficiary);

            const isOwner = await instance.methods.owner().call();

            if(isOwner === accounts[0]) {
                setIsOwner(true)
            }

            const isApprover = await instance.methods.approvers(accounts[0]).call();
            setIsApprover(isApprover);

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
    },[]);

    const createRequest = async e => {
        e.preventDefault();
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

    const handleChange = (e) => {
        setRequest({ ...request, [e.target.name] : e.target.value });
    }

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '25%',
                    minHeight: '75vh'
                }}
            >
                
                    <Typography component="h1" variant="h5">
                        Create a Witdrawal Request
                    </Typography>

                    <form>
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required
                            multiline
                            rows={4}
                            fullWidth
                            name="description"
                            value={request.description}
                            label="Request Description"
                            id="description"
                            onChange={handleChange}   
                        />

                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            padding: '1rem'
                        }} >
                            <TextField 
                                sx={{mr: 3}}
                                name="value"
                                onChange={handleChange} 
                                label={`Donation in ${currency}`} 
                                size="small" 
                            />

                            <FormControl sx={{width: 150}}>
                                <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                                <Select
                                    label="Currency"
                                    onChange={(e) => setCurrency(e.target.value)}
                                    value={currency}
                                >
                                    <MenuItem value={"INR"}>INR</MenuItem>
                                    <MenuItem value={"USD"}>USD</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={e => createRequest(e)}
                        >
                            Submit
                        </Button>

                    </form>
            </Box>
        </Container>   
    )
}

export default WithDrawalRequest;