App = {
  providerAddress: '0x54D492CeE3bF82B735498b40a818834d9c786C5e',
  clientAddress: '0x986E4874D0fFaB15480801db3BdDe64FE886bD9A',
  contracts: {},

  load: async () => {
    await App.loadAccount()
    await App.loadContract()
    await App.render()
  },

  loadAccount: async () => {
    App.account = await ethereum.request({ method: 'eth_accounts' })
  },

  loadContract: async () => {
    const contract = await $.getJSON('LetMeIn.json')
    App.contracts.LetMeIn = TruffleContract(contract)
    const provider = new Web3.providers.HttpProvider("http://localhost:7545");
    App.contracts.LetMeIn.setProvider(provider)
    App.contracts.LetMeIn.defaults({ from: App.providerAddress })
    App.contract = await App.contracts.LetMeIn.deployed()
  },

  render: async () => {
    const providerCount = (await App.contract.providerCount()).toNumber()
    console.log('providerCount', providerCount)
  },

  createAccess: async (address, expiry, photoUrl) => {
    console.log("asd: "+JSON.stringify({ expiry:expiry, photoUrl:photoUrl }))
    await App.contract.createAccess(App.clientAddress, JSON.stringify({ expiry:expiry, photoUrl:photoUrl }))
    console.log('Created access...')
    await App.authorization()
  },

  authorization: async () => {
    const authorization = await App.contract.authorization(App.clientAddress)
    return authorization;
  },
};


(function() {
	App.load()
  if(	document.getElementById("submit")) {
  	document.getElementById("submit").addEventListener('click', async () => {
  		const address = document.getElementById('address').value
  		const expiry = Utils.date2timestamp(document.getElementById('expiry').value)


  		if(expiry && address){
        const photoUrl = IpfsModule.upload("photo", async (photoUrl)=> {
          console.log("photoUrl: ", photoUrl);
          await App.createAccess(address, expiry, photoUrl)
        })

      }
  		else alert('invalid inputs')
  	})
  }
  if(document.getElementById("submitVerification")) {
    document.getElementById("submitVerification").addEventListener('click', async () => {

      var auth = await App.authorization();

  		if(Auth.checkPermissions(auth)){
        var photoElement = document.getElementById("photo");
        photo.src = Auth.getClientURLPhoto(auth);
        photo.display = "block" ;
      }else {
        alert("User not Authorized");
      }

  	})
  }

})();
