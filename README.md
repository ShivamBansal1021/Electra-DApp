# Electra DApp Project

## Overview
Electra DApp is a decentralized voting dApp. It makes the entire election process decentralized. 

---

## Features
-


---

## Technologies used
- [Node.js](https://nodejs.org/)
- [Hardhat](https://hardhat.org/): Development environment for Ethereum.
- [Metamask](https://metamask.io/): Browser wallet for testing and interaction.
- [React](https://react.dev/): JS library for web and native user interfaces.
- [MaterialUI](https://mui.com/material-ui/): A React component library
- [Solidity](https://soliditylang.org/): Programming language designed for developing smart contracts

---

## Installation
1. Clone the repository
   ```bash
   git clone https://github.com/BlockBloom/final-dapp-ShivamBansal1021.git
   ```

2. Smart Contract Deployment 
    1. Navigate to the `hardhat` directory and install dependencies
        ```bash
        cd hardhat
        npm install
        ```
    2. Create a `.env` file with API_URL and PRIVATE_KEY parameters
    3. Deploy the contract with your metamask address (update the metamask address in `ignition\modules\Lock.js` file)  to perform admin actions
        ```bash
        npx hardhat ignition deploy ./ignition/modules/Lock.js --network sepolia
        ```

3. Using the DApp
    1. Navigate to the `Electra Dapp` directory in the cloned repository.
    2. Install dependencies and run Dapp
        ```bash
        npm install
        npm run dev
        ```
    3. Open the link displayed in the terminal in browser with metamask installed.

## Features in DApp
- There are separate routes for voter and admin
- As admin you can perform actions like- creating election, adding candidate for a particular election, manage elections (activate and deactivate elections)
- As voter you can view active elections and vote for one candidate per election