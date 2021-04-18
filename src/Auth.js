const Auth = (function() {
  function checkPermissions(auth){
      var authObj = JSON.parse(auth);
      console.log("authObj", authObj);

      return true;

  }

  function getClientURLPhoto(auth){
    return JSON.parse(auth)["photoUrl"];
  }

  return {
    checkPermissions: checkPermissions,
    getClientURLPhoto: getClientURLPhoto
  }
})();
