var Migrations = artifacts.require("voting/contracts/Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
