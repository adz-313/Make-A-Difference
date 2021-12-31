import React, { useState, useEffect } from 'react';
import NewFundraiser from '../NewFundraiser/NewFundraiser';
import ActiveFundraisers from '../ActiveFundraisers/ActiveFundraisers';

const Home = ({ web3, myinstance, myaccounts, myfundraisers, getFundraisers }) => {
  const [instance, setInstance] = useState(null);
  const [fundraisers, setFundraisers] = useState([]);
  
  const [ accounts, setAccounts ] = useState(null);

  useEffect(() => {
    setInstance(myinstance)
    setAccounts(myaccounts)
    setFundraisers(myfundraisers)
  },[])

  

  return (
    <>
        <NewFundraiser accounts={accounts} />
        <ActiveFundraisers web3={web3} fundraisers={fundraisers} />
    </>
  )
}

export default Home
