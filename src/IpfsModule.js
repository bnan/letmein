
const IpfsModule = (function(){
  //const IPFS_ADDRESS = "https://ipfs.io/ipfs/";
  const IPFS_ADDRESS = "http://localhost:8080/ipfs/";
  function upload(elementId, callback) {
        const reader = new FileReader();
        reader.onloadend = function() {
          const ipfs = window.IpfsApi('localhost', 5001) // Connect to IPFS
          const buf = buffer.Buffer(reader.result) // Convert data into buffer
          ipfs.files.add(buf, (err, result) => { // Upload buffer to IPFS
            if(err) {
              console.error(err)
              return
            }
            let url = IPFS_ADDRESS + result[0].hash
            console.log(`Url --> ${url}`)
            /*document.getElementById("url").innerHTML= url
            document.getElementById("url").href= url
            document.getElementById("output").src = url*/
            callback(url);
          })

        }
        const photo = document.getElementById(elementId);
        reader.readAsArrayBuffer(photo.files[0]); // Read Provided File

  }

  return {
    upload: upload
  };
})();
