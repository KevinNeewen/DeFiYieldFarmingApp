const TokenFarm = artifacts.require("TokenFarm");
const DappToken = artifacts.require("DappToken");
const DaiToken = artifacts.require("DaiToken");

module.exports = async function(deployer, network, accounts) {
  //Deploy DaiToken
  await deployer.deploy(DaiToken);
  const daiToken = await DaiToken.deployed();

  //Deploy DappToken
  await deployer.deploy(DappToken);
  const dappToken = await DappToken.deployed();

  //Deploy TokenFarm
  await deployer.deploy(TokenFarm, daiToken.address, dappToken.address);
  const tokenFarm = await TokenFarm.deployed();

  //Transfer DappToken to TokenFarm so farmers can be rewarded
  await dappToken.transfer(tokenFarm.address, "1000000000000000000000000");

  //Transfer 100 DaiToken to investor
  daiToken.transfer(accounts[1], "100000000000000000000");
};
