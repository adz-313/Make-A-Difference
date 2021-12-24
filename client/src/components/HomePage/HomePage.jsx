import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid } from '@material-ui/core';

import useStyles from './styles';
import ActiveFundraisers from '../ActiveFundraisers/ActiveFundraisers';
import HowItWorks from '../HowItWorks/HowItWorks';

const HomePage = ({ web3, myinstance, myaccounts, myfundraisers, getFundraisers }) => {

    const classes = useStyles();

    const [instance, setInstance] = useState(null);
    const [fundraisers, setFundraisers] = useState([]);

    const [ accounts, setAccounts ] = useState(null);

    useEffect(() => {
        setInstance(myinstance)
        setAccounts(myaccounts)
        setFundraisers(myfundraisers)
    },[])



    return (
        <Container>
            <Grid container  className={classes.root} spacing={5} direction="column" alignItems="center">
                <Grid item xs={12}>
                    {/* <ActiveFundraisers /> */}
                    <Typography>Active Campaigns</Typography>
                </Grid>
                <Grid item xs={12}>
                    <HowItWorks />
                </Grid>
            </Grid>
        </Container>
    )
}

export default HomePage;