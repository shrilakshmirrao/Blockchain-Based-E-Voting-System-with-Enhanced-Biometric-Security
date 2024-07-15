const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = 'glue jeans infant merit lend property present rotate arrange basket winter cotton' //metamask secret key

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // for Ganache
    },
    sepolia: {
      provider: () =>
        new HDWalletProvider(mnemonic, "https://eth-sepolia.g.alchemy.com/v2/igLoeuYZb7KB5E1MauqvRkAaOL-0KaLT"),
      network_id: 11155111, // Sepolia's network id
      gas: 6721975, // Gas limit
      gasPrice: 3006960382, // Gas price (20 Gwei)
    },
    goerli:{
      provider: () =>
        new HDWalletProvider(mnemonic, "https://infura.io/v2/f068da1f32b341fa9b2f84a9282e0231"),
      network_id: 5, // Sepolia's network id
      gas: 6721975, // Gas limit
      gasPrice: 2000000000, // Gas price (20 Gwei)
    },
  },
  compilers: {
    solc: {
      version: '0.4.25',
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
};