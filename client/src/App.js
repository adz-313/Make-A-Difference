import React from 'react';
import { Switch, Route } from "react-router-dom"
import { Typography} from '@mui/material';
import FundraiserPage from './components/FundraiserPage/FundraiserPage';
import Home from './components/Home/Home';

const App = () => {  

  window.ethereum.on('accountsChanged', function (accounts) {
    window.location.reload()
  })

  return (
    <>
      <Typography variant="h3">Make A Difference</Typography>
      <Switch>
        <Route path="/" exact component={Home} />  
				<Route path="/fundraiser/:id" exact component={FundraiserPage} />
			</Switch>
    </>
  )
}

export default App
