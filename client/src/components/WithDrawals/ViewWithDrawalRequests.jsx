import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Box, Button, Grid, Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { cyan } from '@mui/material/colors';
import FundraiserContract from "../../contracts/Fundraiser.json";
const cc = require('cryptocompare');


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
'&:nth-of-type(odd)': {
    backgroundColor: cyan[300]
},
// hide last border
'&:last-child td, &:last-child th': {
    border: 0,
},
}));

const ViewWithDrawalRequests = ({ web3 }) => {

    const params = useParams();

    const [ isOwner, setIsOwner ] = useState(false);
    const [ isApprover, setIsApprover ] = useState(true);
    const [ requests, setRequests ] = useState([]);
    const [ instance, setInstance] = useState(null);
    const [ accounts, setAccounts ] = useState(null);
    const [ exchangeRate, setExchangeRate ] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [ donationsCount, setDonationsCount ] = useState(null);
    const [ currency, setCurrency ] = useState('INR');

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
            // setFundname(name);
            // setDescription(description);
            // setTargetAmount(targetAmount);
            // setImageURL(imageURL);
            // setBeneficiary(beneficiary);
            // setTarget(target);
            
            // const eth = web3.utils.fromWei(totalDonations, 'ether')
            // setTotalDonations(eth);

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
    },[]);

    const withdrawFunds = async index => {
        const x = await instance.methods.finalizeRequest(index).send({
          from: accounts[0],
        });
        alert(`Funds Withdrawn!`)
    }

    const approveRequest = async index => {
        await instance.methods.approveRequest(index).send({ from: accounts[0] });
    }

    const rejectRequest = async index => {
        await instance.methods.rejectRequest(index).send({ from: accounts[0] });
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
                marginTop: "7rem",
            }}
        >
            <Grid container>
                <Grid container direction="row"   justifyContent="space-between" alignItems="center">
                    <Grid item>
                        <Typography variant="h5" color="textprimary" component="div">WithDrawal Request for Test</Typography>
                    </Grid>
                    <Grid item>
                        {isOwner && <Button
                            variant="contained"
                            component={Link}
                            to={`/fundraiser/${params.id}/withdrawal/new`}
                        >Add WithDrawal Request</Button>}
                    </Grid>
                </Grid>
                <Grid container sx={{marginTop: "2rem"}}>
                    <TableContainer component={Paper}>
                        <Table aria-label="allrequests">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>ID</StyledTableCell>
                                    <StyledTableCell>Description</StyledTableCell>
                                    <StyledTableCell>AMOUNT</StyledTableCell>
                                    <StyledTableCell>APPROVAL COUNT</StyledTableCell>
                                    <StyledTableCell>APPROVE</StyledTableCell>
                                    <StyledTableCell>STATUS</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {requests ? requests.map((req, index) => (
                                <TableRow>
                                    {console.log(req)}
                                    <StyledTableCell>{ index+1 }</StyledTableCell>
                                    <StyledTableCell>{ req.description }</StyledTableCell>
                                    <StyledTableCell align="left">{exchangeRate ? `${(web3.utils.fromWei(req.value, 'ether') * exchangeRate[currency]).toFixed(0)} INR` : 'Loading...'}</StyledTableCell>
                                    <StyledTableCell align="left">{req.approvalCount} / {donationsCount}</StyledTableCell>
                                    {isApprover ? 
                                    <StyledTableCell component="th" scope="row">
                                        <Button
                                            color="success"
                                            onClick={() => approveRequest(index)}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            color="error"
                                            onClick={() => rejectRequest(index)}
                                        >
                                            Reject
                                        </Button>
                                    </StyledTableCell> :
                                    !isOwner && <StyledTableCell component="th" scope="row">
                                        Donate first!
                                    </StyledTableCell>
                                    }
                                    {isOwner && <StyledTableCell align="left"><Button disabled={(donationsCount && req.approvalCount < donationsCount/2) || req.complete} variant="contained" onClick={() => withdrawFunds(index)}>Withdraw</Button></StyledTableCell>}
                                    <StyledTableCell align="left">{req.complete ? 'Completed' : 'Pending'}</StyledTableCell>
                                    {/* {isApprover && <StyledTableCell align="left"><Button disabled={!isApprover || req.complete} variant="contained" onClick={() => approveRequest(index)}>Approve</Button></StyledTableCell>} */}
                                </TableRow>
                            )) : 'Loading...'}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ViewWithDrawalRequests;