import { ethers } from "ethers";

import {KEYBOARD_CONTRACT_ADDRESS, KEYBOARD_CONTRACT_ABI} from "../constants/keyboards"


export default function getKeyboardsContract(ethereum) {
  if(ethereum) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    return new ethers.Contract(KEYBOARD_CONTRACT_ADDRESS, KEYBOARD_CONTRACT_ABI, signer);
  } else {
    return undefined;
  }
}