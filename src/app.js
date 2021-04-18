App = {
  providerAddress: '0x1688d0d48C1E45C711f36B4fb03d3FA8975C4203',
  clientAddress: '0x76313a8170daA3C2B68517937c757Cb4505411c1',
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