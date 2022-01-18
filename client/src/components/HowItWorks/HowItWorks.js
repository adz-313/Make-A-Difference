import React from 'react'


import { Grid, Paper, Typography } from '@mui/material';
import { FcShare, FcDonate, FcMoneyTransfer } from "react-icons/fc";


const HowItWorks = () => {


    return (
        <>
            <Typography variant="h4" >How Make-A-Difference Works</Typography>
            <div>
                <Grid container justifyContent="center"  spacing={5}>
                    
                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ height: 240, width: 200 }}>
                            <FcDonate size={40}/>
                            <Typography variant="h5" >Create a Campaign for Fundraising</Typography>
                            <Typography variant="body2" component="p" color="textSecondary">It'll take only 2 minutes. Just enter a few details about the funds you are raising for.</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ height: 240, width: 200 }} >
                                <FcShare size={40}/>
                                <Typography variant="h5" >Share your Campaign</Typography>
                                <Typography variant="body2" component="p" color="textSecondary">All you need to do is share the Campaign with your friends, family and others. In no time, support will start pouring in.</Typography>
                        </Paper>                        
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Paper sx={{ height: 240, width: 200 }} >
                                <FcMoneyTransfer size={40}/>
                                <Typography variant="h5" >Request and Withdraw Funds</Typography>
                                <Typography variant="body2" component="p" color="textSecondary">The funds raised can be withdrawn directly to the recipient when 50% of the contributors approve of the Withdrawal Request.</Typography>
                        </Paper>                      
                    </Grid>

                </Grid>
            </div>
        </>
    )
}

export default HowItWorks;