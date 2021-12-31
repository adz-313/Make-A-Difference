import React, { useState, useEffect } from 'react';
import NewFundraiser from '../NewFundraiser/NewFundraiser';
import ActiveFundraisers from '../ActiveFundraisers/ActiveFundraisers';

const Home = ({ web3 }) => {
  return (
    <>
        <NewFundraiser web3={web3} />
        <ActiveFundraisers web3={web3} />
    </>
  )
}

export default Home
