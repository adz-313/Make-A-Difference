import React, { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom"
import { Container, CssBaseline, Typography } from '@mui/material';
import FundraiserPage from './components/FundraiserPage/FundraiserPage';
import Home from './components/Home/Home';
import CreateCampaign from './components/CreateCampaign/CreateCampaign';

import getWeb3 from "./getWeb3";
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import  WithDrawalRequest from './components/WithDrawals/WithDrawalRequest';
import ViewWithDrawalRequests from './components/WithDrawals/ViewWithDrawalRequests';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

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
        <CssBaseline />
        <Navbar/>
        
          <Switch>
            
              <Route path="/campaign/new" exact component={() => <CreateCampaign web3={web3}/>} />
              {/* <Route path="/" exact component={() => <Home web3={web3} myinstance={instance} myaccounts={accounts} myfundraisers={fundraisers} getFundraisers={getFundraisers} />} /> */}
              <Route path="/home" exact component={() => <HomePage web3={web3} />} />
              <Route path="/fundraiser/:id" exact component={() => <FundraiserPage web3={web3} />} />
              <Route path="/fundraiser/:id/withdrawal/new" exact component={() => <WithDrawalRequest web3={web3} />} />
              <Route path="/fundraiser/:id/allrequests" exact component={() => <ViewWithDrawalRequests web3={web3} />} />
            
              <Route path="/signup" exact component={SignUp} />
            <Route path="/login" exact component={SignIn} />
          </Switch>
    </>
  )
}

export default App 
