import React, { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom"
import { Typography } from '@mui/material';
import FundraiserPage from './components/FundraiserPage/FundraiserPage';
import Home from './components/Home/Home';

import getWeb3 from "./getWeb3";

const App = () => {
  const [ web3, setWeb3 ] = useState(null);

  useEffect(() => {
    const init = async() => {
      try {
        const web3 = await getWeb3();
        setWeb3(web3);

        } catch(error) {
        alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
        console.error(error);
      }
    }
    init();
    
  }, []);

  window.ethereum.on('accountsChanged', function (accounts) {
    window.location.reload()
  })

   return (
    <>
      <Typography variant="h3">Make A Difference</Typography>
      <Switch>
        <Route path="/" exact component={() => <Home web3={web3} />} />  
				<Route path="/fundraiser/:id" exact component={() => <FundraiserPage web3={web3} />} />
			</Switch>
    </>
  )
}

export default App
