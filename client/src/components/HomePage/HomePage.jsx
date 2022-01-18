import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Box } from '@mui/material';
import ActiveFundraisers from '../ActiveFundraisers/ActiveFundraisers';
import HowItWorks from '../HowItWorks/HowItWorks';

const HomePage = ({ web3 }) => {

    return (
        <Container>
            <Box
                sx={{
                    flexGrow: 1,
                    marginTop: "5rem"
                }}
            >
                <Grid item lg={12}>
                    <ActiveFundraisers web3={web3} />
                </Grid>
                <Grid item lg={12} sx={{mt:5}}>
                    <HowItWorks />
                </Grid>
           
            </Box>
        </Container>
    )
}

export default HomePage;