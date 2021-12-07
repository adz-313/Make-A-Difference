import React, { useEffect, useState } from 'react';
import FundraiserContract from "../contracts/Fundraiser.json";
import Web3 from 'web3';
import { Chip, Menu, MenuItem, Card, CardActions, CardMedia, Button, Typography, CardContent, Avatar, CardHeader, IconButton } from '@mui/material'

const FundraiserCard = ({fundraiser}) => {
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))

    const [ contract, setContract] = useState(null)
    const [ accounts, setAccounts ] = useState(null)
    const [ fund, setFundraiser ] = useState(null)
    const [ fundName, setFundname ] = useState(null)
    const [ description, setDescription ] = useState(null)
    const [ totalDonations, setTotalDonations ] = useState(null)
    const [ imageURL, setImageURL ] = useState(null)
    const [ beneficiary, setNewBeneficiary ] = useState('')

    const init = async (fundraiser) => {
        try {

            const accounts = await web3.eth.getAccounts();
            const instance = new web3.eth.Contract(
                FundraiserContract.abi,
                fundraiser
            );
            setContract(instance)
            setAccounts(accounts)
      
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
        if(fundraiser) init(fundraiser)
    },[])

    return (
        <Card>
            <CardMedia component="img" height="300" src={imageURL} />
            {/* <img src={imageURL} height='300px' /> */}
            <CardContent>
                <Typography variant="h6">{fundName}</Typography>
                <Typography variant="body2" color="textSecondary" component="p">{ description }</Typography>
            </CardContent>
            <CardActions disableSpacing>
                <Button color="primary" variant="text">Visit</Button>
            </CardActions>
        </Card>
    )
}

export default FundraiserCard
