import React, { useEffect, useState } from 'react';
import {Link, useHistory} from "react-router-dom";
import { styled, alpha } from '@mui/material/styles';
import { AppBar, Box, IconButton, Toolbar, Typography, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Navbar = ({ setSearchText }) => {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed">
            <Toolbar>
            {/* sx={{ textDecoration: "none" , ml: 5, mr: 2 ,color: "inherit"}} */}
                  
                <Typography component={Link} to="/" 
                    edge="start"
                    color="inherit"
                    aria-label="menu"     
                    sx={{ mr: 2, flexGrow: 1, textDecoration: 'none' }}  
                    variant="h5">
                        Make-A-Difference
                </Typography>
                <Typography component={Link} to="/campaign/new"  sx={{ textDecoration: "none", color: "inherit", mr: 1, pr: 1, borderRight: '#fff 2px solid'}} variant="h6">New Campaign</Typography>
                <Typography component={Link} to="/"  sx={{ textDecoration: "none", color: "inherit", pr: 1, borderRight: '#fff 2px solid'}} variant="h6">How it Works</Typography>
            
                <Search onChange={e => setSearchText(e.target.value)}>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
            
                {/* <IconButton  sx={{mr:1}}>
                    <Brightness5Icon />
                </IconButton> */}
                    
                
            </Toolbar>
        </AppBar>
        </Box>
        
    )
}

export default Navbar;