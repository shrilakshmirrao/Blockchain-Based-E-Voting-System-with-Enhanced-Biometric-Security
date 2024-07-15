var Election = artifacts.require("voting/contracts/Election.sol");

module.exports = function(deployer) {
  deployer.deploy(Election);
};
