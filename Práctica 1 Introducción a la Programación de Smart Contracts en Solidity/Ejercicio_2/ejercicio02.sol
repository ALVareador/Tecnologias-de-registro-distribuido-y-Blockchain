// SPDX-License-Identifier: Unlicenced
pragma solidity 0.8.18;
contract TokenContract {

	address public owner;

	struct Receivers {
    		string name;
    		uint256 tokens;
    		uint256 _ether;
	}

	mapping(address => Receivers) public users;

	modifier onlyOwner(){
    		require(msg.sender == owner);
    		_;
	}

	constructor(){
    		owner = msg.sender;
    		users[owner].tokens = 100;
	}

	function double(uint _value) public pure returns (uint){
    		return _value*2;
	}

	function register(string memory _name) public{
    		users[msg.sender].name = _name;
	}

	function giveToken(address _receiver, uint256 _amount) onlyOwner public{
    		require(users[owner].tokens >= _amount);
    		users[owner].tokens -= _amount;
    		users[_receiver].tokens += _amount;
	}

	function buyTocken(address _receiver, uint256 _amount, uint256 _ether) public  {
    		require(users[owner].tokens >= _amount);
    		require((_ether / 5) == _amount);
    		require(users[_receiver]._ether >= _ether);
    		users[owner].tokens -= _amount;
    		users[owner]._ether += _ether;
    		users[_receiver].tokens += _amount;
    		users[_receiver]._ether -= _ether;
	}
}

