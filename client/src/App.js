import React, { useState, useEffect } from 'react';
import { Switch, Route } from "react-router-dom"
import { Container, CssBaseline, Typography } from '@mui/material';
import FundraiserPage from './components/FundraiserPage/FundraiserPage';
import Home from './components/Home/Home';
import CreateCampaign from './components/CreateCampaign/CreateCampaign';

import FactoryContract from "./contracts/FundraiserFactory.json";
import getWeb3 from "./getWeb3";
import { useDarkMode } from './Hooks/useDarkMode';
import { MuiThemeProvider } from '@material-ui/core';
import Navbar from './components/Navbar/Navbar';
import { dark, light } from './constants/theme';
import HomePage from './components/HomePage/HomePage';

const App = () => {
  const [instance, setInstance] = useState(null);
  const [ accounts, setAccounts ] = useState(null);
  const [fundraisers, setFundraisers] = useState([]);
  const [ web3, setWeb3 ] = useState(null);


  const [theme, toggleTheme, componentMounted] = useDarkMode();

  const themeMode = theme === 'light' ? light : dark;

  useEffect(() => {
    const init = async() => {
      try {

        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        setWeb3(web3);

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        console.log(accounts);

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FactoryContract.networks[networkId];
        const instance = new web3.eth.Contract(
          FactoryContract.abi,
          deployedNetwork && deployedNetwork.address,
        );

        // Set web3, accounts, and contract to the state, and then proceed with an
        setInstance(instance);
        setAccounts(accounts);

        getFundraisers(instance);

      } catch(error) {
        // Catch any errors for any of the above operations.
        alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
        console.error(error);
      }
    }
    init();
    
  }, []);


  window.ethereum.on('accountsChanged', function (accounts) {
    window.location.reload()
  })

  const getFundraisers = async (instance) => {
    try {
      const funds = await instance.methods.fundraisers(10, 0).call();
      setFundraisers(funds);
    } catch (error) {
      alert(error)
    }
  }


    // Warning: If any hook is defined under this, it will give error: React Hook "useLocation" is called conditionally
    if(!componentMounted) {
      return <div />
    };

   return (
    <>
      <MuiThemeProvider theme={themeMode}>
        <CssBaseline />
        <Navbar theme={theme} toggleTheme={toggleTheme}/>
        <Container>
          <Switch>
            <Route path="/campaign/new" exact component={() => <CreateCampaign web3={web3} myinstance={instance} myaccounts={accounts} myfundraisers={fundraisers} getFundraisers={getFundraisers} />} />
            {/* <Route path="/" exact component={() => <Home web3={web3} myinstance={instance} myaccounts={accounts} myfundraisers={fundraisers} getFundraisers={getFundraisers} />} />   */}
            <Route path="/" exact component={() => <HomePage web3={web3} myinstance={instance} myaccounts={accounts} myfundraisers={fundraisers} getFundraisers={getFundraisers} />} />
            <Route path="/fundraiser/:id" exact component={() => <FundraiserPage web3={web3} />} />
          </Switch>
        </Container>
      </MuiThemeProvider>
    </>
  )
}

export default App
