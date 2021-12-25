# Make-A-Difference
A decentralized fundraising application.

## How to run
1. In main directory, run `truffle compile`
2. If Openzeppelin contracts are not found, install them using `npm install @openzeppelin/contracts`
3. If compilation is successful, migrate contracts onto blockchain using `truffle migrate`
4. Optionally, you can test the smart contracts using `truffle test`
5. In client directory, install dependencies using `npm i` and run the react code on development server using `npm start`

## How to run
1. Smart Contract Error: Returned values aren't valid, did it run Out of Gas? Run `truffle migrate --reset`