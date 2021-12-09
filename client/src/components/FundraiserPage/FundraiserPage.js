import React, { useEffect, useState } from 'react';
import FundraiserContract from "../../contracts/Fundraiser.json";
import Web3 from 'web3';
import { Typography } from '@mui/material';

import { useParams } from 'react-router-dom';

const FundraiserPage = () => {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))

    const params = useParams();

    const [ address, setAddress] = useState(null)
    const [ fundName, setFundname ] = useState(null)
    const [ description, setDescription ] = useState(null);
    const [ imageURL, setImageURL ] = useState(null);

    const init = async (fundraiser) => {
        try {
            const instance = new web3.eth.Contract(
                FundraiserContract.abi,
                fundraiser
            );
            

            const name = await instance.methods.name().call()
            const description = await instance.methods.description().call()
            const imageURL = await instance.methods.imageURL().call()

            setFundname(name)
            setDescription(description)
            setImageURL(imageURL)

          }
        catch(error) {
        alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
        );
        console.error(error);
        }
    }

    useEffect(() => {
        if(params.id) init(params.id)
    },[])

    return (
        <div>
            <h1>Hello</h1>
            <Typography variant="h6">{fundName}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">{ description }</Typography>
        </div>
    )
}

export default FundraiserPage
