import React from 'react';
import {Link, useHistory} from "react-router-dom";
import Brightness5Icon from '@mui/icons-material/Brightness5';
//import Brightness4Icon from '@mui/icons-material/Brightness4';

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';

const Navbar = () => {


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
            <Toolbar>
            {/* sx={{ textDecoration: "none" , ml: 5, mr: 2 ,color: "inherit"}} */}
                  
                        <Typography component={Link} to="/home" 
                            edge="start"
                            color="inherit"
                            aria-label="menu"     
                            sx={{ mr: 2, flexGrow: 1, textDecoration: 'none' }}  
                            variant="h5">
                                Make-A-Difference
                        </Typography>
                    
                    
                        <Typography component={Link} to="/campaign/new"  sx={{ textDecoration: "none", color: "inherit", mr: 3}} variant="h6" >Create Campaign</Typography>
                        <Typography component={Link} to="/home"  sx={{  textDecoration: "none", color: "inherit"}} variant="h6"  >How it Works</Typography>
                        {/* <IconButton  sx={{mr:1}}>
                            <Brightness5Icon />
                        </IconButton> */}
                    
                
            </Toolbar>
        </AppBar>
        </Box>
        
    )
}

export default Navbar;