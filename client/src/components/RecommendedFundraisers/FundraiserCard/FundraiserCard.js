import React, { useEffect, useState } from 'react';
import { Card, CardActions, CardMedia, Button, Typography, CardContent, Chip } from '@mui/material';

const FundraiserCard = ({fundName, description, imageURL, category}) => {

    // const categoryConvert = [
    //     'Healthcare', 
    //     'Animals',
    //     'Art and culture',
    //     'Community development',
    //     'Environment',
    //     'Education',
    //     'Human services',
    //     'Religion'
    // ]

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
                <Button color="primary" variant="text">Visit</Button>
            </CardActions>
        </Card>
    )
}

export default FundraiserCard
