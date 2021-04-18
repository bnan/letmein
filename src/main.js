(function() {
  App.load();
  const submit = document.getElementById('submit');
  if(submit) {
  	submit.addEventListener('click', async () => {
  		const address = document.getElementById('address').value;
  		const expiry = Utils.date2timestamp(document.getElementById('expiry').value);

  		if(expiry && address) {
        IpfsModule.upload("photo", async (photoUrl)=> {
          console.log("photoUrl: ", photoUrl);
          await App.createAccess(address, expiry, photoUrl)
        });
      } else { 
        alert('invalid inputs')
      }
  	});
  }

  const verification = document.getElementById('submitVerification');
  if(verification) {
    verification.addEventListener('click', async () => {
      var auth = await App.authorization();

  		if(Auth.checkPermissions(auth)){
        const photo = document.getElementById("photo");
        photo.src = Auth.getClientURLPhoto(auth);
        photo.display = "block" ;
      } else {
        alert("User not Authorized");
      }
  	})
  }
})();