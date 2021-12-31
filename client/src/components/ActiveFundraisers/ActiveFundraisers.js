import React, { useState, useEffect } from 'react';
import FundraiserCard from './FundraiserCard/FundraiserCard';
import { Grid, Typography } from '@mui/material';
import FactoryContract from "../../contracts/FundraiserFactory.json";


const ActiveFundraisers = ({ web3 }) => {
    const [fundraisers, setFundraisers] = useState([]);  
    const [instance, setInstance] = useState(null);  

    useEffect(() => {
        const init = async() => {
          try {
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = FactoryContract.networks[networkId];
            const instance = new web3.eth.Contract(
              FactoryContract.abi,
              deployedNetwork && deployedNetwork.address,
            );
            
            setInstance(instance);
            const funds = await instance.methods.fundraisers(10, 0).call();
            setFundraisers(funds);
            
    
          } catch(error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
            console.error(error);
          }
        }
        if(web3) init();
        
      }, []);

    const getFundraisers = async (instance) => {
        try {
          const funds = await instance.methods.fundraisers(10, 0).call();
          setFundraisers(funds);
        } catch (error) {
          alert(error)
        }
    }

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
