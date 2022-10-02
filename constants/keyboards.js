
export const KEYBOARD_CONTRACT_ADDRESS = '0x5fd475842Dc1500fCA521ED883aCcde5C72410a5';

export const KEYBOARD_CONTRACT_ABI = [
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "enum Keyboards.KeyboardType",
            "name": "kind",
            "type": "uint8"
          },
          {
            "internalType": "address payable",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isPBT",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "filter",
            "type": "string"
          }
        ],
        "indexed": false,
        "internalType": "struct Keyboards.Keyboard",
        "name": "keyboard",
        "type": "tuple"
      }
    ],
    "name": "KeyboardAdded",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      }
    ],
    "name": "Tipped",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "enum Keyboards.KeyboardType",
        "name": "_kind",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "_isPBT",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "_filter",
        "type": "string"
      }
    ],
    "name": "createKeyboard",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getKeyboards",
    "outputs": [
      {
        "components": [
          {
            "internalType": "enum Keyboards.KeyboardType",
            "name": "kind",
            "type": "uint8"
          },
          {
            "internalType": "address payable",
            "name": "creator",
            "type": "address"
          },
          {
            "internalType": "bool",
            "name": "isPBT",
            "type": "bool"
          },
          {
            "internalType": "string",
            "name": "filter",
            "type": "string"
          }
        ],
        "internalType": "struct Keyboards.Keyboard[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTips",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "keyboardId",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "timestamp",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "internalType": "struct Keyboards.Tip[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "keyboards",
    "outputs": [
      {
        "internalType": "enum Keyboards.KeyboardType",
        "name": "kind",
        "type": "uint8"
      },
      {
        "internalType": "address payable",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isPBT",
        "type": "bool"
      },
      {
        "internalType": "string",
        "name": "filter",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "tip",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
]

