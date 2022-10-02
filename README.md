# Keyboard Generator

This project is a Dapp which allows users to generate keyboards on blockchain. Users can view other's keyboards and can also donate some ether to their account.

![App Image](https://raw.githubusercontent.com/nishajakhar/KeyboardGenerator/master/public/App.png)



# Features 
- User can create new keyboard
- User can view other user created keyboards
- User can send ETH to other keyboard created owners
- User can view all tips received till now
- User gets notification popup
    - When any new keyboard is created
    - When somebody donated ether to him/her


![App Image](https://raw.githubusercontent.com/nishajakhar/KeyboardGenerator/master/public/AppCreate.png)


## Requirements :hammer:
- Alchemy Account
- Alchemy Goerli API Key and URL
- Nodejs
- NPM
- Ethereum supported account's Private Key
## Steps to deploy contract :construction_worker_man:

1. Copy .env-example file to .env
``` cp .env-example .env```

2. Now You will need to replace your alchemy url, api key and private key in .env file

3. Now compile and deploy the contract using hardhat
```
npx hardhat compile
npx hardhat run scripts/deploy.js --network goerli
```


4. Copy the contract address from the console. We have to paste it in our frontend code to interact with it


## Steps to run frontend: :unicorn:

1. Paste the contract address under KEYBOARD_CONTRACT_ADDRESS in constants/keyboards.js file
2. Copy the contract ABI from artifacts/contracts/Keyboards.sol/Keyboards.json and paste it under KEYBOARD_CONTRACT_ABI in constants/keyboards.js file

3. Now create the build and start the server
```
npm build
npm start
```
4. Go to browser and type the url
http://localhost:3000






