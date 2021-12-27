import React, { useState, useEffect } from 'react';
import FactoryContract from "../../contracts/FundraiserFactory.json";
import getWeb3 from "../../getWeb3";

import NewFundraiser from '../NewFundraiser/NewFundraiser';
import ActiveFundraisers from '../ActiveFundraisers/ActiveFundraisers';

const Home = () => {
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
    const init = async() => {
      try {

        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        
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

  const getFundraisers = async (instance) => {
    try {
      const funds = await instance.methods.fundraisers(10, 0).call();
      setFundraisers(funds);
    } catch (error) {
      alert(error)
    }
  }

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
        <ActiveFundraisers fundraisers={fundraisers} />
    </>
  )
}

export default Home
