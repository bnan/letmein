App = {
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
    App.contracts.LetMeIn.defaults({ from: '0x1688d0d48C1E45C711f36B4fb03d3FA8975C4203' })
    App.contract = await App.contracts.LetMeIn.deployed()
  },

  render: async () => {
    const providerCount = (await App.contract.providerCount()).toNumber()
    console.log('providerCount', providerCount)
  },

  createAccess: async (address, expiry) => {
    await App.contract.createAccess('0x76313a8170daA3C2B68517937c757Cb4505411c1', JSON.stringify({ expiry }))
    console.log('Created access...')
    await App.authorization()
  },

  authorization: async () => {
    const authorization = await App.contract.authorization('0x76313a8170daA3C2B68517937c757Cb4505411c1')
    console.log('authorization', authorization)
  },
};

function date2timestamp(myDate) {
	return new Date(myDate).getTime()
}

function upload() {
      const reader = new FileReader();
      reader.onloadend = function() {
        const ipfs = window.IpfsApi('localhost', 5001) // Connect to IPFS
        const buf = buffer.Buffer(reader.result) // Convert data into buffer
        ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
          if(err) {
            console.error(err)
            return
          }
          let url = `https://ipfs.io/ipfs/${result[0].hash}`
          console.log(`Url --> ${url}`)
          document.getElementById("url").innerHTML= url
          document.getElementById("url").href= url
          document.getElementById("output").src = url
        })
      }
      const photo = document.getElementById("photo");
      reader.readAsArrayBuffer(photo.files[0]); // Read Provided File
}

(function() {
	App.load()

	document.getElementById("submit").addEventListener('click', async () => {
		const address = document.getElementById('address').value
		const expiry = date2timestamp(document.getElementById('expiry').value)
                upload()

		//if(expiry && address) await App.createAccess(address, expiry)
		//else alert('invalid inputs')
	})
	const photo = document.getElementById("photo");
	reader.readAsArrayBuffer(photo.files[0]);
})();
