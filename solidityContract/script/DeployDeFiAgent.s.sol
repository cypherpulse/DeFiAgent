// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Script.sol";
import "../src/DeFiAgent.sol";

contract DeployDeFiAgent is Script {
    function run() external {
        vm.startBroadcast();
        address treasury = msg.sender; // Treasury is the deployer
        new DeFiAgent(treasury);
        vm.stopBroadcast();
    }
}