const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
const fs = require("fs");
const secrets = JSON.parse(fs.readFileSync(".secrets.json").toString().trim());

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    ropsten: {
      networkCheckTimeout: 10000,
      provider: () => {
         return new HDWalletProvider(
           secrets.mnemonic,
           'wss://ropsten.infura.io/ws/v3/a08e405b2d9b44f780df9a99fa6932b0'
         );
      },
      network_id: "3",
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: '*'
    },
    develop: {
      port: 8545
    }
  },
  compilers: {
    solc: {
      version: "0.8.9",
    }
  },
};
