import React, { useState, useEffect } from 'react';
import { Typography, Container, Grid, Box } from '@mui/material';
import ActiveFundraisers from '../ActiveFundraisers/ActiveFundraisers';
import HowItWorks from '../HowItWorks/HowItWorks';
import RecommendedFundraisers from '../RecommendedFundraisers/RecommendedFundraisers'

const HomePage = ({ web3, searchText }) => {

    return (
        <Container>
            <Box
                sx={{
                    flexGrow: 1,
                    marginTop: "5rem"
                }}
            >
                <Grid item lg={12}>
                    <ActiveFundraisers searchText={searchText} web3={web3} />
                </Grid>
                <Grid item lg={12}>
                    <RecommendedFundraisers searchText={searchText} web3={web3} />
                </Grid>
                <Grid item lg={12} sx={{mt:5}}>
                    <HowItWorks />
                </Grid>
           
            </Box>
        </Container>
    )
}

export default HomePage;