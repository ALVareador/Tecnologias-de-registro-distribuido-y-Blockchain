// SPDX-License-Identifier: MIT
pragma solidity ^0.8.3;

contract IpfsStorage {
    mapping  (address => string) public userFiles;

    function setFileIpfs (string memory file) external {
        userFiles[msg.sender] = file;
    }
}
