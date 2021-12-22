pragma solidity ^0.5.0;

import './DappToken.sol';
import './DaiToken.sol';

contract TokenFarm {
  string public name = 'The Token Farm';
  
  DappToken public dappToken;
  DaiToken public daiToken;
  address public owner;

  address[] public stakers;
  mapping(address => uint) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  //On smart contract deployment
  constructor(DappToken _dappToken, DaiToken _daiToken) public {
    dappToken = _dappToken;
    daiToken = _daiToken;
    owner = msg.sender;
  }

  function stakeTokens(uint _amount) public {
    require(_amount > 0, "Amount cannot be 0");

    //transfer mDai to this contract address
    daiToken.transferFrom(msg.sender, address(this), _amount);

    //update staking balance
    stakingBalance[msg.sender] += _amount;

    //add user to stacking 'only' array if they havent staked already
    if(!hasStaked[msg.sender]) {
      stakers.push(msg.sender);
    }

    //update staking status
    hasStaked[msg.sender] = true;
    isStaking[msg.sender] = true;
  }

  function unstakeAllTokens() public {
    uint balance = stakingBalance[msg.sender];
    require(balance > 0, 'Staking balanace must be greater than 0');

    daiToken.transfer(msg.sender, balance);

    stakingBalance[msg.sender] = 0;

    isStaking[msg.sender] = false;
  }

  function issueTokens() public {
    require(msg.sender == owner, "Caller must be owner.");
    for(uint i=0; i < stakers.length; i++) {
      address recipientAddress = stakers[i];
      uint balance = stakingBalance[recipientAddress];
      if(balance > 0) {
        //For every 1 DaiToken, 1 Dapp token will be issued.
        dappToken.transfer(recipientAddress, balance);
      }
    }
  }
}