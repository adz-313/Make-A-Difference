import React, { useEffect, useState } from 'react';
import FundraiserContract from "../../../contracts/Fundraiser.json";
import getWeb3 from "../../../getWeb3";
import { Card, CardActions, CardMedia, Button, Typography, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';
import Web3 from 'web3'

const FundraiserCard = ({fundraiser}) => {

    const [ address, setAddress] = useState(null)
    const [ fundName, setFundname ] = useState(null)
    const [ description, setDescription ] = useState(null);
    const [ imageURL, setImageURL ] = useState(null);

    const init = async (fundraiser) => {
        try {
            const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
            
            const instance = new web3.eth.Contract(
                FundraiserContract.abi,
                fundraiser
            );
            
            setAddress(instance._address);

            const name = await instance.methods.name().call()
            const description = await instance.methods.description().call()
            const imageURL = await instance.methods.imageURL().call()
                
            setFundname(name)
            console.log(name)
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
        if(fundraiser) init(fundraiser)
    },[])

    return (
        <Card>
            <CardMedia component="img" height="300" src={imageURL} />
            {/* <img src={imageURL} height='300px' /> */}
            <CardContent>
                <Typography variant="h6">{fundName}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{ description ? description.substr(0, 150) + `... Read more` : 'Loading...' }</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button color="primary" variant="text" component={Link} to={`/fundraiser/${address}`}>Visit</Button>
            </CardActions>
        </Card>
    )
}

export default FundraiserCard
