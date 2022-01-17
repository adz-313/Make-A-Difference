import React from 'react';
import {Link, useHistory} from "react-router-dom";
import Brightness5Icon from '@mui/icons-material/Brightness5';
import Brightness4Icon from '@mui/icons-material/Brightness4';

import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';

const Navbar = ({theme, toggleTheme}) => {


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
            <Toolbar>
            {/* sx={{ textDecoration: "none" , ml: 5, mr: 2 ,color: "inherit"}} */}
                  
                        <Typography component={Link} to="/home" 
                            edge="start"
                            color="inherit"
                            aria-label="menu"     
                            sx={{ mr: 2, flexGrow: 1 }}  
                            variant="h5">
                                Make-A-Difference
                        </Typography>
                    
                    
                        <Typography component={Link} to="/campaign/new"  sx={{ textDecoration: "none", color: "inherit", mr: 3}} variant="h5" >Create Campaign</Typography>
                        <Typography component={Link} to="/"  sx={{  textDecoration: "none", color: "inherit"}} variant="h5"  >How it Works</Typography>
                        <IconButton  sx={{mr:1}}  onClick={toggleTheme}>
                            {
                                theme === 'dark' ? <Brightness5Icon /> : <Brightness4Icon />
                            }
                        </IconButton>
                    
                
            </Toolbar>
        </AppBar>
        </Box>
        
    )
}

export default Navbar;