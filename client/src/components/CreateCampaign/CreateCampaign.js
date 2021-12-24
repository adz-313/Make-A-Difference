import React, {useState} from 'react';


import { Container, TextField, Button, Link, Grid, Typography  } from '@material-ui/core';
import useStyles from './styles';

const initialState = {
    name: '',
    imageUrl: '',
    description: '',
    beneficiary: ''
}

const CreateCampaign = () => {

    const classes = useStyles();

    const [formData, setFormData] = useState(initialState);
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    return (
        <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Create Campaign
                </Typography>

                <form className={classes.form}>
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Campaign Name"
                        name="name"
                        autoFocus
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="description"
                        label="Campaign Description"
                        id="description"
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="imageUrl"
                        label="Image URL"
                        id="imageUrl"
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Submit
                    </Button>

                </form>

            </div>
        </Container>
    )
}

export default CreateCampaign;