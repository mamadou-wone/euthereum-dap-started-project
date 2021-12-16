var Xcoin = artifacts.require("Xcoin.sol");

module.exports = function(deployer) {
    deployer.deploy(Xcoin);
};