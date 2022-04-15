import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import FundraiserContract from "../../contracts/Fundraiser.json";
import { Chip, IconButton, Typography, TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem, Container, Box, Grow, Card, CardContent, CardHeader, Avatar, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import LoadingButton from '@mui/lab/LoadingButton';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { recordTransaction } from '../../api/index';
import DonationModal from './Modal/DonationModal';
// const cc = require('cryptocompare');


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
    const [ isRequestBased, setIsRequestBased] = useState(null);
    const [ fundName, setFundname ] = useState(null);
    const [ description, setDescription ] = useState(null);
    const [ category, setCategory ] = useState(null);
    const [ imageURL, setImageURL ] = useState(null);
    const [ donationAmount, setDonationAmount] = useState(0);
    const [ message, setMessage] = useState('');
    const [ totalDonations, setTotalDonations ] = useState(null);
    const [ target, setTarget ] = useState(null);
    const [ accounts, setAccounts ] = useState(null);
    const [ exchangeRate, setExchangeRate ] = useState({
        'INR': 211822.19,
        'USD': 2572.38
    });
    const [ donationsCount, setDonationsCount ] = useState(null);
    const [ currency, setCurrency ] = useState('INR');
    const [ isOwner, setIsOwner ] = useState(false);
    const [ isApprover, setIsApprover ] = useState(true);
    const [ requests, setRequests ] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ request, setRequest ] = useState(null);
    const [ donations, setDonations ] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const init = async (fundraiser) => {
        try {
            const instance = new web3.eth.Contract(
                FundraiserContract.abi,
                fundraiser
            );
            // const exchangeRate = await cc.price('ETH', ['INR', 'USD'])

            const accounts = await web3.eth.getAccounts();
            const name = await instance.methods.name().call();
            const description = await instance.methods.description().call();
            const category = await instance.methods.category().call();
            const imageURL = await instance.methods.imageURL().call();
            const target = await instance.methods.targetToAchieve().call();
            const totalDonations = await instance.methods.totalDonations().call();
            const donationsCount = await instance.methods.donationsCount().call();
            const beneficiary = await instance.methods.beneficiary().call();
            const isRequestBased = await instance.methods.isRequestBased().call();

            setDonationsCount(donationsCount);            
            // setExchangeRate(exchangeRate);
            setAccounts(accounts);
            setInstance(instance);
            setFundname(name);
            setDescription(description);
            setCategory(category);
            setImageURL(imageURL);
            setBeneficiary(beneficiary);
            // target = web3.utils.fromWei(target, 'ether');
            setTarget(parseFloat(web3.utils.fromWei(target, 'ether')));
            setIsRequestBased(isRequestBased);

            const eth = web3.utils.fromWei(totalDonations, 'ether')
            setTotalDonations(eth);

            const owner = await instance.methods.owner().call();
            if(owner === accounts[0]) {
                setIsOwner(true)
            }

            const isApprover = await instance.methods.approvers(accounts[0]).call();
            setIsApprover(isApprover);
            
            const count = await instance.methods.getRequestsCount().call();

            const donations = await instance.methods.getDonations().call();
            setDonations(donations);
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

    const toggleModal = () => {
        setShowModal(!showModal);
        console.log(showModal);
    }

    const donate = async () => {
        setLoading(true);
        const ethTotal = donationAmount/ exchangeRate[currency];
        const donation = web3.utils.toWei(ethTotal.toFixed(18).toString());
        await instance.methods.donate(message, 'aditya').send({
            from: accounts[0],
            value: donation,
            gas: 650000
        });
        
        let exp_amt = 0;
        if(currency !== 'INR') {
            exp_amt = ethTotal * exchangeRate['INR'];
            exp_amt = exp_amt.toFixed(0);
        } else {
            exp_amt = donationAmount;
        }

        const serverTransaction = {
            userId: accounts[0],
            amount: parseInt(exp_amt),
            drive: params.id
        }

        try {
            await recordTransaction(params.id, serverTransaction);
        }
        catch(e) {
            console.log(e)
        }
        setLoading(false);
        setDonationAmount(0);
    }

    // Not used here, used in Withdrawal section
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

    // Not used here, used in Withdrawal section
    const approveRequest = async index => {
        await instance.methods.approveRequest(index).send({ from: accounts[0] });
    }

    const withdraw = async () => {
        await instance.methods.withdraw().send({ from: accounts[0] });
    }

    return (
        <Grid container>
            <Grid item xs={12} lg={8} sx={{ marginTop: '5rem', marginBottom: '1rem'}}>
                <Box sx={{
                    width: '50%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                }}>
                    <img src={imageURL} width='100%' />
                </Box>
                <Typography variant="h4" sx={{ marginBottom: '1rem'}}>{fundName}</Typography>
                <Typography variant="h6" sx={{ marginBottom: '1rem'}}>{`Category: ${category}`}</Typography>
                <Typography variant="body1" color="textprimary" marginTop="1rem">{ description }</Typography>
            </Grid>
            <Grid item xs={12} lg={4} sx={{ marginTop: '2rem', marginBottom: '1rem'}}>
                <Card
                    sx={{
                        marginTop: '70px',
                        border: '1px solid #000',
                        width: '100%'
                    }}
                >
                    <CardContent>
                        <Typography color="text.primary" variant="h5" component="div">Over {donationsCount} people have donated already. Donate now!</Typography>
                        <Typography sx={{mt:1}} color="text.primary" variant="body1" component="div">{ exchangeRate ? (totalDonations * exchangeRate[currency]).toFixed(2)  : 'Loading...'} {currency === 'INR' ? '₹' : '$'} raised out of { exchangeRate ? (target * exchangeRate[currency]).toFixed(2)  : 'Loading...'} {currency === 'INR' ? '₹' : '$'}</Typography>
                        {exchangeRate && <BorderLinearProgress variant="determinate" value={totalDonations < target ? (((totalDonations * exchangeRate[currency]) / (target * exchangeRate[currency]))*100).toFixed(0) : 100} />}
                    </CardContent>

                    <CardContent sx={{ maxHeight: '10rem', overflow: 'auto' }}>
                        {donations && donations.length > 0 ? donations.map(donation => {
                            return (
                                <CardHeader 
                                    avatar={
                                        <Avatar sx={{ bgcolor: '#555' }} aria-label="user">
                                            {donation.name[0].toUpperCase()}
                                        </Avatar>
                                    }
                                    title= {donation.message === '' ? 'Donated ' : donation.message}
                                    subheader= {`${web3.utils.fromWei(donation.value, "ether")} eth`}
                                />
                            )
                        }) :
                        <Box>
                            <Typography>
                                No donations yet...
                            </Typography>
                        </Box>
                        }
                    </CardContent>
                    
                    
                    <hr/>
                    {/* <TextField variant="standard" sx={{ml: 1, mt: 3, width: '68%'}} onChange={(e) => setDonationAmount(e.target.value)} label={`Donation in ${currency}`} size="small" />
                    <FormControl sx={{width: '25%', ml: 2, mt: 2, mb: 1}}>
                        <InputLabel id="demo-simple-select-label">Currency</InputLabel>
                        <Select
                            label="Currency"
                            onChange={(e) => setCurrency(e.target.value)}
                            value={currency}
                        >
                            <MenuItem value={'INR'}>INR</MenuItem>
                            <MenuItem value={"USD"}>USD</MenuItem>
                        </Select>
                    </FormControl> */}

                    <DonationModal donate={donate} currency={currency} setCurrency={setCurrency} setDonationAmount={setDonationAmount} setMessage={setMessage} showModal={showModal} toggleModal={toggleModal} />

                    <CardActions>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            justifyContent: 'space-evenly',
                            // minHeight: '6rem'
                        }}>
                            {
                                !isOwner ? 
                                <LoadingButton
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={toggleModal}
                                    loading={loading}
                                >
                                    Donate Now
                                </LoadingButton> : 
                                isRequestBased == 'true' ? <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    component={Link} to={`/fundraiser/${params.id}/withdrawal/new`}
                                >
                                    Withdraw
                                </Button> : 
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    onClick={withdraw}
                                >
                                    Withdraw
                                </Button>
                            }

                            {isRequestBased == 'true' && <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                component={Link}
                                to={`/fundraiser/${params.id}/allrequests`}
                                sx={{mt: 2}}
                            >
                                View WithDrawal Requests
                            </Button>}

                            <Box sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'flex-start',
                                padding: '0 1rem',
                                mt: 1
                            }}>
                                <Box sx={{ flexGrow: 1, mt: '5px' }}>
                                    <Typography variant='h6' >Share now</Typography>
                                </Box>
                                <IconButton>
                                    <Box sx={{color: '#076ea8'}} component="a" target='_blank' href={`https://www.linkedin.com/sharing/share-offsite/?url=http%3A%2F%2Fmake-a-difference%2Enetlify%2Eapp%2Ffundraiser%2F${params.id}%2F`}> <LinkedInIcon /> </Box>
                                    {/* <a target='_blank' href={`https://www.linkedin.com/sharing/share-offsite/?url=http%3A%2F%2Fmake-a-difference%2Enetlify%2Eapp%2Ffundraiser%2F${params.id}%2F`}><LinkedInIcon /></a>  */}
                                </IconButton>
                                <IconButton>
                                    {/* <a target='_blank' href={`https://www.facebook.com/sharer.php?u=http%3A%2F%2Fmake-a-difference%2Enetlify%2Eapp%2Ffundraiser%2F${params.id}%2F`}><FacebookIcon /></a>  */}
                                    <Box sx={{color: '#4267B2'}} component="a" target='_blank' href={`https://www.facebook.com/sharer.php?u=http%3A%2F%2Fmake-a-difference%2Enetlify%2Eapp%2Ffundraiser%2F${params.id}%2F`}> <FacebookIcon /> </Box>
                                </IconButton>
                                <IconButton>
                                <Box sx={{color: '#00acee'}} component="a" target='_blank' href={`https://twitter.com/intent/tweet?url=http%3A%2F%2Fmake-a-difference%2Enetlify%2Eapp%2Ffundraiser%2F${params.id}%2F`}> <TwitterIcon /> </Box>
                                    {/* <a target='_blank' href={`https://twitter.com/intent/tweet?url=http%3A%2F%2Fmake-a-difference%2Enetlify%2Eapp%2Ffundraiser%2F${params.id}%2F`}><TwitterIcon /></a>  */}
                                </IconButton>
                            </Box>
                        </Box>
                        
                        {/* <div>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                            >See All Donations</Button>
                        </div> */}
                        
                    </CardActions>
                    
                </Card>
            </Grid>
        </Grid>
    // <div>
    //         <Grid container direction="row" marginTop="1rem">
    //             <Grid item sx={{padding: 2}} md={6} lg={8}>
    //                 <img src={imageURL} height={250} style={{'marginLeft': '17rem', 'marginTop': '2rem', 'marginBottom': '2rem'}}/>
    //                 <Typography variant="h4">{fundName}</Typography>
    //                 <Typography sx={{mt: 1, mb: 1}} variant="body2" color="textSecondary" component="p">{ description }</Typography>
    //                 <Typography sx={{color: '#3d5afe'}} variant="h6" color="textSecondary" component="h5">Total Money Raised: { exchangeRate ? (totalDonations * exchangeRate[currency]).toFixed(0)  : 'Loading...'} {currency === 'INR' ? '₹' : '$'}</Typography>
    //                 <Typography variant="h6" color="textSecondary" component="h5">Target: { target }</Typography>
    //             </Grid>
    //             <Grid item md={6} lg={4} >
    //                 <Paper sx={{padding: 2}}>
    //                     {isOwner ? 
    //                         <Button
    //                             variant="contained"
    //                             color="primary"
    //                             // onClick={createRequest}
    //                             sx={{mt: 3, width: '90%', ml: 3}}
    //                         >
    //                             Create Request
    //                         </Button> :
    //                         <>
    //                             { console.log(accounts) }
    //                             <Typography variant='h6'>Donate Now</Typography>
    //                             <TextField variant="standard" sx={{mt: 3, width: '70%'}} onChange={(e) => setDonationAmount(e.target.value)} label={`Donation in ${currency}`} size="small" />
    //                             <FormControl sx={{width: '25%', ml: 2, mt: 2}}>
    //                                 <InputLabel id="demo-simple-select-label">Currency</InputLabel>
    //                                 <Select
    //                                     label="Currency"
    //                                     onChange={(e) => setCurrency(e.target.value)}
    //                                     value={currency}
    //                                 >
    //                                     <MenuItem value={'INR'}>INR</MenuItem>
    //                                     <MenuItem value={"USD"}>USD</MenuItem>
    //                                 </Select>
    //                             </FormControl>
    //                             <Button sx={{mt: 3, width: '90%', ml: 3}} variant="outlined" onClick={() => donate()}>Submit</Button>
    //                         </>
    //                     }
    //                 </Paper>
    //             </Grid>
    //         </Grid>
    //     </div>
    )
}

export default FundraiserPage