const { assert } = require("chai");

const DaiToken = artifacts.require("DaiToken");
const DappToken = artifacts.require("DappToken");
const TokenFarm = artifacts.require("TokenFarm");

require("chai")
  .use(require("chai-as-promised"))
  .should();

function tokens(number) {
  return web3.utils.toWei(number.toString(), "ether");
}

//Using contract ensures each contract function has a new clean contract slate
//As the contract is redeployed before tests are run.
contract("TokenFarm", ([owner, investor]) => {
  let daiToken;
  let dappToken;
  let tokenFarm;

  before(async () => {
    //Load contracts
    daiToken = await DaiToken.new();
    dappToken = await DappToken.new();
    tokenFarm = await TokenFarm.new(dappToken.address, daiToken.address);

    //Transfer all Dapp tokensto farm (1 million)
    await dappToken.transfer(tokenFarm.address, tokens(1000000));

    //Send tokens to investor
    await daiToken.transfer(investor, tokens(100), { from: owner });
  });

  describe("Mock Dai deployment", async () => {
    it("has a name", async () => {
      const name = await daiToken.name();
      assert.equal(
        name,
        "Mock DAI Token",
        "DaiToken contract must have a name"
      );
    });
  });

  describe("Dapp Token deployment", async () => {
    it("has a name", async () => {
      const name = await dappToken.name();
      assert.equal(name, "Dapp Token", "Dapp Token contract must have a name");
    });
  });

  describe("Token farm deployment", async () => {
    it("has a name", async () => {
      const name = await tokenFarm.name();
      assert.equal(
        name,
        "The Token Farm",
        "Token farm deployment must have a name"
      );
    });

    it("has dapp tokens", async () => {
      let balance = await dappToken.balanceOf(tokenFarm.address);
      assert.equal(
        balance.toString(),
        tokens(1000000),
        "The Token farm must have initialised Dapp tokens for yield rewards"
      );
    });
  });

  describe("Farming tokens", async () => {
    it("rewards investors for staking mDai tokens", async () => {
      //check investor balance before staking
      let result = await daiToken.balanceOf(investor);
      assert.equal(
        result.toString(),
        tokens(100),
        "Investor balance is not correct prior to staking"
      );

      //Stake mDai Token
      await daiToken.approve(tokenFarm.address, tokens(100), {
        from: investor,
      });
      await tokenFarm.stakeTokens(tokens(100), { from: investor });

      const stakingBalance = await tokenFarm.stakingBalance(investor);
      assert.equal(
        stakingBalance.toString(),
        tokens(100),
        "Staking balance is not correct after staking"
      );

      let daiBalanceForInvestor = await daiToken.balanceOf(investor);
      assert(
        daiBalanceForInvestor.toString(),
        tokens(0),
        "Dai balannce for investor is not correct after staking"
      );

      let daiBalanceForTokenFarm = await daiToken.balanceOf(tokenFarm.address);
      assert(
        daiBalanceForTokenFarm.toString(),
        tokens(100),
        "Dai balannce for token farm is not correct after staking"
      );

      //Issue Tokens as rewards
      await tokenFarm.issueTokens({ from: owner });

      const dappBalanceForInvestor = await dappToken.balanceOf(investor);
      assert(
        dappBalanceForInvestor,
        tokens(100),
        "Dapp Balance for Investor is not correct after staking and issuance."
      );

      //Unstake tokens
      await tokenFarm.unstakeAllTokens({ from: investor });
      daiBalanceForInvestor = await daiToken.balanceOf(investor);

      assert(
        daiBalanceForInvestor.toString(),
        tokens(100),
        "Investor should have dai balance back to 100 after unstaking"
      );

      daiBalanceForTokenFarm = await daiToken.balanceOf(tokenFarm.address);
      assert(
        daiBalanceForTokenFarm.toString(),
        tokens(0),
        "TokenFarm should have dai balance back to 0 after unstaking"
      );

      var isInvestorStaking = await tokenFarm.isStaking(investor);
      assert(
        isInvestorStaking.toString(),
        "false",
        "Investor should not be staking anymore."
      );
    });
  });
});
