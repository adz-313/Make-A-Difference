import React, { useState, useEffect } from 'react';
import FundraiserCard from './FundraiserCard/FundraiserCard';
import { Grid, Typography } from '@mui/material';
import FundraiserContract from "../../contracts/Fundraiser.json";
import FactoryContract from "../../contracts/FundraiserFactory.json";

const ActiveFundraisers = ({ web3, searchText }) => {


    const [fundraisers, setFundraisers] = useState([]);  
    const [instance, setInstance] = useState(null);
    const [fundraiserDetails, setFundraiserDetails] = useState([]);
    const [searchedFundraisers, setSearchedFundraisers] = useState([]);
    
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

      useEffect(() => {
        if(fundraisers) {
          let newFundraiserDetails = [];

          async function fun(fundraisers){
            let arr = [];
            for(let i=0; i<fundraisers.length; i++) {
              try {
                const instance = new web3.eth.Contract(
                    FundraiserContract.abi,
                    fundraisers[i]
                );    
                const name = await instance.methods.name().call();
                const category = await instance.methods.category().call();
                
                arr.push({name, category: category.toLowerCase(), fundraiserID: fundraisers[i]});
              }
              catch(error) {
                console.error(error);
              }
            }
            return arr;
          }

          fun(fundraisers).then(resp => {
            console.log(resp)
            newFundraiserDetails = resp;
          })
          .then(() => {
            setFundraiserDetails(newFundraiserDetails)
          });
          
        }
      },[fundraisers]);

      useEffect(() => {
        if(fundraiserDetails) {
          const arr = fundraiserDetails.filter(fd => fd.name.search(searchText) !== -1 || fd.category.search(searchText) !== -1);
          setSearchedFundraisers(arr);
        }
      }, [fundraiserDetails]);

    return (
        <div>
            <Typography variant="h5" margin="1rem 0">Active Fundraisers</Typography>
            <Grid container spacing={3}>
            {
              searchText ? 
              searchedFundraisers.length > 0 ? searchedFundraisers.map((fundraiser) => {
                  return (
                      <Grid key={fundraiser} item xs={12} sm={6} md={4}>
                          <FundraiserCard web3={web3} fundraiser={fundraiser.fundraiserID} />
                      </Grid>
                  )
                }) : <Typography sx={{ml: 3, mt: 1}} variant='h6'>No results found</Typography>
                :
                fundraisers.map((fundraiser) => {
                return (
                    <Grid key={fundraiser} item xs={12} sm={6} md={4}>
                        <FundraiserCard web3={web3} fundraiser={fundraiser} />
                    </Grid>
                )
                }) 
            }
            </Grid>
        </div>
    )
}

export default ActiveFundraisers
