import React from 'react';
import {Link, useHistory} from "react-router-dom";
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness4Icon from '@material-ui/icons/Brightness4';

import useStyles from './styles';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

const Navbar = ({theme, toggleTheme}) => {
    const classes = useStyles();

    return (
        <AppBar position="fixed">
            <Toolbar>
                
                    <div className={classes.arrange}>
                        <Typography component={Link} to="/f" className={classes.appName} variant="h5" >Make-A-Difference</Typography>
                    </div>
                    
                        <Typography component={Link} to="/campaign/new"  className={classes.links} variant="h5" >Create Campaign</Typography>
                        <Typography component={Link} to="/" className={classes.links} variant="h5" >How it Works</Typography>
                        <IconButton  className={classes.iconBtn}  onClick={toggleTheme}>
                            {
                                theme === 'dark' ? <Brightness5Icon /> : <Brightness4Icon />
                            }
                        </IconButton>
                    
                
            </Toolbar>
        </AppBar>
    )
}

export default Navbar;