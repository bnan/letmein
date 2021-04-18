class App {
  constructor() {
    this.providerAddress = "0xF70c5332F7aE16c588F6689fc8998d3aae6ceFd5";
    this.clientAddress = "0xC12AE3C32921C245aEe9d811d82c0C0F5E3C5CBb";
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
    await this.contract.createAccess(address || this.clientAddress, permissions);
    console.log(`Authorized access ${JSON.stringify(this.authorization())}`);
  }

  async authorization(address) {
    return await this.contract.authorization(address || this.clientAddress)
  }
};
