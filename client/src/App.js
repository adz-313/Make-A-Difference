import React, { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom"
import { Container, CssBaseline, Typography } from '@mui/material';
import FundraiserPage from './components/FundraiserPage/FundraiserPage';
import SignUp from './components/SignUp/SignUp';
import CreateCampaign from './components/CreateCampaign/CreateCampaign';
import Footer from './components/Footer/Footer';

import getWeb3 from "./getWeb3";
import Navbar from './components/Navbar/Navbar';
import HomePage from './components/HomePage/HomePage';
import  WithDrawalRequest from './components/WithDrawals/WithDrawalRequest';
import ViewWithDrawalRequests from './components/WithDrawals/ViewWithDrawalRequests';
// import SignIn from './components/SignIn/SignIn';
// import SignUp from './components/SignUp/SignUp';

const App = () => {
  const [ web3, setWeb3 ] = useState(null);
  const [searchText, setSearchText] = useState('');

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
        <Navbar setSearchText={setSearchText}/>
        <Container>
          <Switch>
            <Route path="/campaign/new" exact component={() => <CreateCampaign web3={web3}/>} />
            <Route path="/signup" exact component={() => <SignUp />} />
            {/* <Route path="/" exact component={() => <Home web3={web3} myinstance={instance} myaccounts={accounts} myfundraisers={fundraisers} getFundraisers={getFundraisers} />} /> */}
            <Route path="/" exact component={() => <HomePage searchText={searchText} web3={web3} />} />
            <Route path="/fundraiser/:id" exact component={() => <FundraiserPage web3={web3} />} />
            <Route path="/fundraiser/:id/withdrawal/new" exact component={() => <WithDrawalRequest web3={web3} />} />
            <Route path="/fundraiser/:id/allrequests" exact component={() => <ViewWithDrawalRequests web3={web3} />} />
          </Switch>
        </Container>
        <Footer />
    </>
  )
}

export default App 
