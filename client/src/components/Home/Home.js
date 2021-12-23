import React, { useState, useEffect } from 'react';
import NewFundraiser from '../NewFundraiser/NewFundraiser';
import ActiveFundraisers from '../ActiveFundraisers/ActiveFundraisers';

const Home = ({ web3, myinstance, myaccounts, myfundraisers, getFundraisers }) => {
  const [instance, setInstance] = useState(null);
  const [fundraisers, setFundraisers] = useState([]);
  const [fundraiser, setFundraiser] = useState({
    name: '',
    imageUrl: '',
    description: '',
    beneficiary: ''
  })
  const [ accounts, setAccounts ] = useState(null);

  useEffect(() => {
    setInstance(myinstance)
    setAccounts(myaccounts)
    setFundraisers(myfundraisers)
  },[])

  const clear = () => {
    setFundraiser({
      name: '',
      imageUrl: '',
      description: '',
      beneficiary: ''
    });
  }

  const createFundraiser = async () => {
    await instance.methods.createFundraiser(
      fundraiser.name,
      fundraiser.imageUrl,
      fundraiser.description,
      fundraiser.beneficiary
    ).send({ from: accounts[0] })

    alert('Successfully created fundraiser')
    if(instance) getFundraisers(instance)
    clear()
  }

  return (
    <>
        <NewFundraiser accounts={accounts} fundraiser={fundraiser} setFundraiser={setFundraiser} createFundraiser={createFundraiser} />
        <ActiveFundraisers web3={web3} fundraisers={fundraisers} />
    </>
  )
}

export default Home
