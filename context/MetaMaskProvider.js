import { useState, useEffect, createContext, useContext } from "react";

const MetaMaskAccountContext = createContext();

export default function MetaMaskAccountProvider({children}){
    const [ethereum, setEthereum] = useState(undefined);
    const [account, setAccount] = useState(undefined);

    const setWindowEthereum = async() => {
        if(window.ethereum){
            window.ethereum.on('chainChanged', (_chainId) => window.location.reload());
            const chainId = await window.ethereum.request({method : "eth_chainId"});
            const goerliId = '0x5';
            if(chainId == goerliId) setEthereum(window.ethereum);
            else alert('Please use Goerli test network');
        }
    }
    useEffect(setWindowEthereum, []);

    const handleAccounts = (accounts) => {
        if (accounts.length > 0) {
          const account = accounts[0];
          console.log('We have an authorized account: ', account);
          setAccount(account);
        } else {
          console.log("No authorized accounts yet")
        }
      };
    
      const getConnectedAccount = async () => {
        if (ethereum) {
          const accounts = await ethereum.request({ method: 'eth_accounts' });
          handleAccounts(accounts);
        }
      };
      useEffect(() => getConnectedAccount());
    
      const connectAccount = async () => {
        if (!ethereum) {
          console.error('Ethereum object is required to connect an account');
          return;
        }
    
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        handleAccounts(accounts);
      };
      
      const value = {ethereum, account, connectAccount};
    
      return (
        <MetaMaskAccountContext.Provider value={value}>
          {children}
        </MetaMaskAccountContext.Provider>
      )
}

export function useMetaMaskAccount(){
    return useContext(MetaMaskAccountContext);
}