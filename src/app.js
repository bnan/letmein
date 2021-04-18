class App {
  constructor() {
    this.providerAddress = "0x1688d0d48C1E45C711f36B4fb03d3FA8975C4203";
    this.clientAddress = "0x76313a8170daA3C2B68517937c757Cb4505411c1";
    this.blockchainRpcServer = "http://localhost:7545";

    this.loadAccount();
    this.loadContract();
  }

  async loadAccount() {
    this.account = await window.ethereum.request({ method: "eth_accounts" });
  }

  async loadContract() {
    const contract = await (await fetch("LetMeIn.json")).json();
    this.contracts = {};
    this.contracts.LetMeIn = TruffleContract(contract);
    this.contracts.LetMeIn.setProvider(
      new Web3.providers.HttpProvider(this.blockchainRpcServer)
    );
    this.contracts.LetMeIn.defaults({ from: this.providerAddress });
    this.contract = await this.contracts.LetMeIn.deployed();
  }

  async createAccess(address, expiry, photoUrl) {
    const permissions = JSON.stringify({ expiry: expiry, photoUrl: photoUrl });
    console.log(`Authorizing ${this.clientAddress} with ${permissions}`);
    await this.contract.createAccess(this.clientAddress, permissions);
    console.log(`Authorized access ${JSON.stringify(this.authorization())}`);
  }

  authorization: async () => {
    return await App.contract.authorization(App.clientAddress)
  },
};
