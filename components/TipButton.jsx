import {useState} from 'react';
import {ethers} from 'ethers';

export default function TipButton({keyboardsContract, index}){
    const [processing, setProcessing] = useState(false);
    
    const submitTip = async (e) => {
    if (!keyboardsContract) {
      console.error('KeyboardsContract object is required to submit a tip');
      return;
    }

    setProcessing(true);
    try {
      const tipTxn = await keyboardsContract.tip(index, { value: ethers.utils.parseEther("0.0001") })
      console.log('Tip transaction started...', tipTxn.hash)

      await tipTxn.wait();
      console.log('Sent tip!', tipTxn.hash);
    } catch(error){
        console.log("Error Occurred", error);
        }finally {
      setProcessing(false);
    }
  }

    return (
        <button onClick={submitTip} disabled={processing} className="bg-gray-900 p-2 text-white rounded w-1/2">
        {processing? "Processing" : 'Tip 0.0001 ETH!'}
        </button>
    )
}