import React, {useContext, useEffect} from 'react';
import FundraiserCard from './FundraiserCard/FundraiserCard';
import { Grid, Typography } from '@mui/material';
import { FundraiserContext } from '../../contexts/FundraiserContext';

const ActiveFundraisers = ({ web3 }) => {
    const [fundraisers, setFundraisers] = useContext(FundraiserContext);

    useEffect(() => {
        console.log(fundraisers)
    },[])

    return (
        <div>
            <Typography variant="h5" margin="1rem 1rem">Active Fundraisers</Typography>
            <Grid container spacing={3}>
            {
                fundraisers.length > 0 ? fundraisers.map((fundraiser) => {
                return (
                    <Grid key={fundraiser} item xs={12} sm={6} md={4} lg={3}>
                        <FundraiserCard fundraiser={fundraiser} web3={web3} />
                    </Grid>
                )
                }) : <p>Loading...</p>
            }
            </Grid>
        </div>
    )
}

export default ActiveFundraisers
