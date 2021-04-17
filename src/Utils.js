const Utils = (function (){
  function date2timestamp(myDate) {
  	return new Date(myDate).getTime()
  }

  return {
    date2timestamp: date2timestamp
  }
})();
