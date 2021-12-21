import React from 'react';
import FundraiserCard from './FundraiserCard/FundraiserCard';
import { Grid, Typography } from '@mui/material';

const ActiveFundraisers = ({ fundraisers }) => {
    return (
        <div>
            <Typography variant="h5" margin="1rem 1rem">Active Fundraisers</Typography>
            <Grid container spacing={3}>
            {
                fundraisers.map((fundraiser) => {
                return (
                    <Grid key={fundraiser} item xs={12} sm={6} md={4} lg={3}>
                        <FundraiserCard fundraiser={fundraiser} />
                    </Grid>
                )
                })
            }
            </Grid>
        </div>
    )
}

export default ActiveFundraisers
