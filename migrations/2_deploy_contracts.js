const LetMeIn = artifacts.require("./LetMeIn.sol");

module.exports = function(deployer) {
  deployer.deploy(LetMeIn);
};
