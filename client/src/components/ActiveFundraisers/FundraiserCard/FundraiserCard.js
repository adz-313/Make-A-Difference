import React, { useEffect, useState } from 'react';
import FundraiserContract from "../../../contracts/Fundraiser.json";
import Web3 from 'web3';
import { Card, CardActions, CardMedia, Chip, Button, Typography, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

const FundraiserCard = ({web3, fundraiser}) => {

    const [ address, setAddress] = useState(null)
    const [ fundName, setFundname ] = useState(null)
    const [ description, setDescription ] = useState(null);
    const [ imageURL, setImageURL ] = useState(null);
    const [ category, setCategory ] = useState(null);

    const init = async (fundraiser) => {
        try {
            const instance = new web3.eth.Contract(
                FundraiserContract.abi,
                fundraiser
            );
            
            setAddress(instance._address);

            const name = await instance.methods.name().call()
            const description = await instance.methods.description().call()
            const imageURL = await instance.methods.imageURL().call()
            const category = await instance.methods.category().call()
                
            setFundname(name)
            setDescription(description)
            setImageURL(imageURL)
            setCategory(category)
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
                <Chip sx={{mt: 1}} label={category} variant="outlined" />
            </CardContent>
            <CardActions disableSpacing>
                <Button color="primary" variant="text" component={Link} to={`/fundraiser/${address}`}>Visit</Button>
            </CardActions>
        </Card>
    )
}

export default FundraiserCard
