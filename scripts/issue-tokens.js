const TokenFarm = artifacts.require("TokenFarm");

module.exports = async function issueTokens(callback) {
  console.log("Attempting to issue tokens.");

  let tokenFarm = await TokenFarm.deployed();

  await tokenFarm.issueTokens();

  console.log("Tokens issued!");

  callback();
};
