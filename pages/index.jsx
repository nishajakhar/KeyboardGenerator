import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { UserCircleIcon } from "@heroicons/react/solid";
import { toast } from "react-hot-toast";
// import PrimaryButton from "../components/primary-button";
import Keyboard from "../components/Keyboard";
import TipButton from "../components/TipButton";
import getKeyboardsContract from "../utils/KeyboardsContract"
import { useMetaMaskAccount } from "../context/MetaMaskProvider";

export default function Home() {
  const {ethereum, account, connectAccount} = useMetaMaskAccount();
  // account = null;
  const [loading, setLoading] = useState(false);
  const [keyboards, setKeyboards] = useState([]);
  const [tips, setTips] = useState([]);

let keyboardsContract = getKeyboardsContract(ethereum);
  const getKeyboardsAndTips = async () => {
    try {

      if (account) {
        setLoading(true);
        let keyboards;
        let tips;
        let arr = [];

        async function get(){
        keyboardsContract = getKeyboardsContract(ethereum);
        keyboards = await keyboardsContract.getKeyboards();
        tips = await keyboardsContract.getTips();
        await Promise.all(tips.map(item => {
          arr.push({from : item.from.toString().toLowerCase(), timestamp : item.timestamp.toString(), keyboard : item.keyboardId.toString(), amount : ethers.utils.formatEther(item.amount) })
        }));
        }
        await get();
        setKeyboards(keyboards);
        
                console.log("tips...1111..", arr)

        setTips(arr);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }finally {
        setLoading(false);
      }
  };
  useEffect(() => getKeyboardsAndTips(), [!!keyboardsContract, account]);

//TODO : Off the events in return block
  const contractEventsHandlers = () => {
    if(keyboardsContract && account){
      keyboardsContract.on('KeyboardAdded', async(keyboard) => {
        if(keyboard.creator.toLowerCase() != account) {
          toast('Somebody created a new keyboard!', {id : JSON.stringify(keyboard)});
        }
        await getKeyboardsAndTips();
      })

      keyboardsContract.on('Tipped', async(amount, creator) => {
        if(creator.toLowerCase() == account) {
          toast(`Somebody tipped you with ${ethers.utils.formatEther(amount)} ETH!`);
        }
      })
    }
  }
  useEffect(() => contractEventsHandlers(), [!!keyboardsContract, account])
 

  return (
    <div className="text-center">
    <div className="px-8 flex justify-between content-center py-4">
      <h1 className="font-bold text-3xl  "> Keyboard Generator </h1>
      {ethereum && !account && <button className="py-2 px-5 bg-blue-700 text-white rounded" onClick={connectAccount}>Connect Metamask Wallet </button>}
      {ethereum && account && 
      <p className=" border-2 border-white-800 rounded-full px-4 py-1 bg-cyan-900 text-white">
      <UserCircleIcon className="h-5 w-5 text-indigo-100 inline" /> 
      {account}
      </p>}

      </div>
      <div className="border-b-2 border-white-900"></div>
       <div className="main">
      {ethereum && account && 
          <div className="mx-44 flex justify-between content-center py-10">

     <p className="text-left">Create Keyboards and list publicly for others to see!! </p>
             <a className="py-2 px-5 bg-blue-700 text-white rounded" type="link" href="/create">Create a Keyboard!</a>
      </div> }
     { !ethereum && <p>Please install metamask to use this Dapp!</p>}
     {ethereum && account &&  <div className="mx-44 flex flex-col gap-4">
     <h1 className="text-xl font-bold pb-2 text-left"> All Keyboards </h1>
           <div className="border-b-2 border-white-900"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
        {keyboards.map(
          ([kind, creator, isPBT, filter], i) => (
            <div key={i} className="relative">
              <Keyboard kind={kind} isPBT={isPBT} filter={filter} />
              <div className="py-1">
                {creator.toLowerCase() == account ? 
                <p> Created by You </p>
                  : <TipButton keyboardsContract={keyboardsContract} index={i} />
                }
              </div>
            </div>
          )
        )}
        </div>
      </div>
     }

     {ethereum && account &&  <div className="mx-44 flex flex-col gap-4 mt-10">
     <h1 className="text-xl font-bold pb-2 text-left"> Tips Received</h1>
           <div className="border-b-2 border-white-900"></div>

        <div className="flex-col gap-2 p-2">
        {tips.map(
          (data, i) => (
            <div key={i} className="">
              <div className="py-2  flex justify-between">
                
               <p>From : <br /> {data.from} </p>
               <p>Timestamp : <br /> {data.timestamp} </p>
               <p>Keyboard ID : <br /> {data.keyboard} </p>
               <p>Amount : <br /> {data.amount} </p>
              </div>
            </div>
          )
        )}
        </div>
      </div>
     }
     </div>
          <footer className="text-center border-t-2 border-white py-5 mt-5">Made with &#10084; by Nisha for pointer.gg</footer>
    </div>
  );
}
