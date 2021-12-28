import React, { useState, useEffect, createContext } from 'react';

import FactoryContract from "../contracts/FundraiserFactory.json";
import getWeb3 from "../getWeb3";

export const FundraiserContext = createContext();

export const FundraiserProvider = props => {
    const [fundraisers, setFundraisers] = useState([]);

    useEffect(() => {
        const init = async() => {
          try {
            const web3 = await getWeb3();

            const networkId = await web3.eth.net.getId();
            const deployedNetwork = FactoryContract.networks[networkId];
            const instance = new web3.eth.Contract(
              FactoryContract.abi,
              deployedNetwork && deployedNetwork.address,
            );
    
            instance.methods.fundraisers(10, 0).call()
            .then(resp => setFundraisers(resp));
            
    
          } catch(error) {
            alert(`Failed to load web3, accounts, or contract. Check console for details.`,);
            console.error(error);
          }
        }
        init();
        
    }, []);

    useEffect(() => {
        console.log(fundraisers);
    },[fundraisers])

    return(
        <FundraiserContext.Provider value={[fundraisers, setFundraisers]}>
            {props.children}
        </FundraiserContext.Provider>
    );
}