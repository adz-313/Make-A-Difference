import React from 'react'

import { Grid, Paper, Typography } from '@material-ui/core';
import { FcShare, FcDonate, FcMoneyTransfer } from "react-icons/fc";

import useStyles from './styles';

const HowItWorks = () => {

    const classes = useStyles();

    return (
        <>
            <Typography variant="h4" >How Make-A-Difference Works</Typography>
            <div>
                <Grid container justifyContent="center"  spacing={3}>
                    
                    <Grid item xs={12}>
                        <Paper elevation={3}>
                            <FcDonate/>
                            <Typography variant="h5" >Create a Campaign for Fundraising</Typography>
                            <Typography variant="body2" component="p" color="textSecondary">It'll take only 2 minutes. Just enter a few details about the funds you are raising for.</Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12}>
                        <Paper elevation={3}>
                                <FcShare/>
                                <Typography variant="h5" >Share your Campaign</Typography>
                                <Typography variant="body2" component="p" color="textSecondary">All you need to do is share the Campaign with your friends, family and others. In no time, support will start pouring in.</Typography>
                        </Paper>                        
                    </Grid>

                    <Grid item xs={12}>
                        <Paper elevation={3}>
                                <FcMoneyTransfer/>
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