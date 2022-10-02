import Router from "next/router";
import { useState } from "react";
import Keyboard from "../components/Keyboard";
import getKeyboardsContract from "../utils/KeyboardsContract";
import { useMetaMaskAccount } from "../context/MetaMaskProvider";
import { UserCircleIcon } from "@heroicons/react/solid";

export default function Create() {
  const { ethereum, account, connectAccount } = useMetaMaskAccount();
  const [keyboardKind, setKeyboardKind] = useState(0);
  const [isPBT, setIsPBT] = useState(false);
  const [filter, setFilter] = useState('');

  const [mining, setMining] = useState(false);

  const keyboardsContract = getKeyboardsContract(ethereum);

  const submitCreate = async (e) => {
    e.preventDefault();

    if (!keyboardsContract) {
      console.error('KeyboardsContract object is required to create a keyboard');
      return;
    }

    setMining(true);
    try {
      const createTxn = await keyboardsContract.createKeyboard(keyboardKind, isPBT, filter)
      console.log('Create transaction started...', createTxn.hash)

      await createTxn.wait();
      console.log('Created keyboard!', createTxn.hash);

      Router.push('/');
    } finally {
      setMining(false);
    }
  }

  return (
      <>
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
    { !ethereum && <p className="text-center pt-5">Please install metamask to use this Dapp!</p>}

    {ethereum && account && 
    <div className="flex flex-col gap-y-8 mx-44">
      <form className="mt-8 ">
      <div className="flex gap-2 py-5">
        <div className="flex-1">
          <label htmlFor="keyboard-type" className="block text-sm font-medium text-gray-700">
            Keyboard Type
          </label>
          <select
            id="keyboard-type"
            name="keyboard-type"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={keyboardKind}
            onChange={(e) => { setKeyboardKind(e.target.value) }}
          >
            <option value="0">60%</option>
            <option value="1">75%</option>
            <option value="2">80%</option>
            <option value="3">ISO-105</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="keycap-type" className="block text-sm font-medium text-gray-700">
            Keycap Type
          </label>
          <select
            id="keycap-type"
            name="keycap-type"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            value={isPBT ? "pbt" : "abs"}
            onChange={(e) => { setIsPBT(e.target.value === "pbt") }}
          >
            <option value="abs">ABS</option>
            <option value="pbt">PBT</option>
          </select>
        </div>

        <div className="flex-1">
          <label htmlFor="filter" className="block text-sm font-medium text-gray-700">
            Filter
          </label>
          <select
            id="filter"
            name="filter"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            onChange={(e) => { setFilter(e.target.value) }}
            value={filter}
            
          >
            <option value="">None</option>
            <option value="sepia">Sepia</option>
            <option value="grayscale">Grayscale</option>
            <option value="invert">Invert</option>
            <option value="hue-rotate-90">Hue Rotate (90°)</option>
            <option value="hue-rotate-180">Hue Rotate (180°)</option>
          </select>
        </div>
</div>
        <button className="py-2 px-5 bg-blue-700 text-white rounded" type="submit" disabled={mining} onClick={submitCreate}>
          {mining? "Creating..." : "Create Keyboard!"}
        </button>
      </form>

      <div>
        <h2 className="block text-lg font-medium text-gray-700">Preview</h2>
        <Keyboard kind={keyboardKind} isPBT={isPBT} filter={filter} />
      </div>
    </div>
    }
    </div>
          <footer className="text-center border-t-2 border-white py-5 mt-5">Made with &#10084; by Nisha for pointer.gg</footer>

    </>
  )
}