pragma solidity ^0.5.0;

contract LetMeIn {
  uint public providerCount = 0;

  mapping(address => mapping(address => string)) accesses;

  function createAccess(address client, string memory _jsonPermissions) public {
    accesses[msg.sender][client] = _jsonPermissions;
    providerCount++;
  }

  function authorization(address client) public view returns (string memory) {
    return accesses[msg.sender][client];
  }
}
