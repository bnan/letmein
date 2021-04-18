App = {
  providerAddress: '0xF70c5332F7aE16c588F6689fc8998d3aae6ceFd5',
  clientAddress: '0xC12AE3C32921C245aEe9d811d82c0C0F5E3C5CBb',
  blockchainRpcServer: 'http://localhost:7545',
  contracts: {},

  load: async () => {
    await App.loadAccount()
    await App.loadContract()
  },

  loadAccount: async () => {
    App.account = await ethereum.request({ method: 'eth_accounts' })
  },

  loadContract: async () => {
    const contract = await (await fetch('LetMeIn.json')).json();
    console.log('contract fetchd', contract)
    App.contracts.LetMeIn = TruffleContract(contract)
    const provider = new Web3.providers.HttpProvider(App.blockchainRpcServer);
    App.contracts.LetMeIn.setProvider(provider)
    App.contracts.LetMeIn.defaults({ from: App.providerAddress })
    App.contract = await App.contracts.LetMeIn.deployed()
  },

  createAccess: async (address, expiry, photoUrl) => {
    const permissions = JSON.stringify({ expiry:expiry, photoUrl:photoUrl });
    console.log(`Authorizing ${App.clientAddress} with ${permissions}`);
    await App.contract.createAccess(App.clientAddress, permissions);
    console.log(`Authorized access ${JSON.stringify(App.authorization())}`);
  },

  authorization: async () => {
    return await App.contract.authorization(App.clientAddress)
  },
};
