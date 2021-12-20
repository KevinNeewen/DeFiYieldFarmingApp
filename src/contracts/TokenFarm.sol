pragma solidity ^0.5.0;

import './DappToken.sol';
import './DaiToken.sol';

contract TokenFarm {
  string public name = 'The Token Farm';
  
  DappToken public dappToken;
  DaiToken public daiToken;

  //On smart contract deployment
  constructor(DappToken _dappToken, DaiToken _daiToken) public {
    dappToken = _dappToken;
    daiToken = _daiToken;
  }
}