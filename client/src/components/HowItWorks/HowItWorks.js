import React from 'react'
import { Grid, Typography } from '@mui/material';
import { FcShare, FcDonate, FcMoneyTransfer } from "react-icons/fc";


const HowItWorks = () => {


    return (
        <>
            <Typography variant="h5" >How Make-A-Difference Works</Typography>
            <Grid container justifyContent="center"  spacing={5} sx={{ margin: '1rem 0' }} >
                <Grid item xs={12} sm={6} md={4} sx={{ padding: '0 1rem 1rem  1rem ', borderRight: '1px solid #aaa' }} >
                    <span style={{ marginLeft: '40%', paddingBottom: '1rem'}}>
                        <FcDonate size={50}/>
                    </span>
                    <Typography variant="h5" >Create a Campaign for Fundraising</Typography>
                    <Typography variant="body2" component="p" color="textSecondary">It'll take only 2 minutes. Just enter a few details about the funds you are raising for.</Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4} sx={{ padding: '0 1rem 1rem  1rem ', borderRight: '1px solid #aaa' }}>
                    <span style={{ marginLeft: '40%', marginBottom: '1rem'}}>
                        <FcShare size={50}/>
                    </span>
                    <Typography variant="h5" >Share your Campaign</Typography>
                    <Typography variant="body2" component="p" color="textSecondary">All you need to do is share the Campaign with your friends, family and others. In no time, support will start pouring in.</Typography>
                </Grid>

                <Grid item xs={12} sm={6} md={4} sx={{ padding: '0 1rem 1rem  1rem ' }}>
                    <span style={{ marginLeft: '40%', marginBottom: '1rem'}}>
                        <FcMoneyTransfer size={50}/>
                    </span>
                    <Typography variant="h5" >Request and Withdraw Funds</Typography>
                    <Typography variant="body2" component="p" color="textSecondary">The funds raised can be withdrawn directly to the recipient when 50% of the contributors approve of the Withdrawal Request.</Typography>
                </Grid>

            </Grid>
        </>
    )
}

export default HowItWorks;