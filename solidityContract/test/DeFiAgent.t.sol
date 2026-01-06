// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "forge-std/Test.sol";
import "../src/DeFiAgent.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20 {
    constructor() ERC20("Mock Token", "MOCK") {
        _mint(msg.sender, 1000000 * 10**18);
    }
}

contract DeFiAgentTest is Test {
    receive() external payable {}

    DeFiAgent public deFiAgent;
    MockERC20 public mockToken;
    address public owner;
    address public user;
    address public agent;
    address public treasury;

    function setUp() public {
        owner = address(this);
        user = address(0x1);
        agent = address(0x2);
        treasury = owner; // For simplicity, treasury is owner
        deFiAgent = new DeFiAgent(treasury);
        mockToken = new MockERC20();
    }

    function testDepositETH() public {
        vm.deal(user, 1 ether);
        vm.prank(user);
        deFiAgent.depositETH{value: 1 ether}();
        assertEq(deFiAgent.userDepositETH(user), 1 ether);
        assertEq(deFiAgent.getTotalDeposited(), 1 ether);
    }

    function testDepositERC20() public {
        mockToken.transfer(user, 100 * 10**18);
        vm.startPrank(user);
        mockToken.approve(address(deFiAgent), 100 * 10**18);
        deFiAgent.depositERC20(address(mockToken), 100 * 10**18);
        vm.stopPrank();
        assertEq(deFiAgent.userDepositERC20(user, address(mockToken)), 100 * 10**18);
        assertEq(deFiAgent.getTotalDeposited(), 100 * 10**18);
    }

    function testGrantAgent() public {
        deFiAgent.grantAgent(agent);
        assertTrue(deFiAgent.isAgent(agent));
    }

    function testRevokeAgent() public {
        deFiAgent.grantAgent(agent);
        deFiAgent.revokeAgent(agent);
        assertFalse(deFiAgent.isAgent(agent));
    }

    function testAgentHarvest() public {
        deFiAgent.grantAgent(agent);
        vm.prank(agent);
        deFiAgent.agentHarvest(1000);
        assertEq(deFiAgent.totalYieldHarvested(), 1000);
        assertEq(deFiAgent.totalFeesCollected(), 7); // 0.75% of 1000 = 7.5, but uint256 so 7
    }

    function testAgentHarvestByOwner() public {
        deFiAgent.agentHarvest(1000);
        assertEq(deFiAgent.totalYieldHarvested(), 1000);
        assertEq(deFiAgent.totalFeesCollected(), 7);
    }

    function testAgentHarvestRevertUnauthorized() public {
        vm.prank(user);
        vm.expectRevert("Not owner or agent");
        deFiAgent.agentHarvest(1000);
    }

    function testWithdrawETH() public {
        vm.deal(address(deFiAgent), 1 ether);
        deFiAgent.withdrawETH(1 ether);
        assertEq(address(deFiAgent).balance, 0);
    }

    function testWithdrawERC20() public {
        mockToken.transfer(address(deFiAgent), 100 * 10**18);
        deFiAgent.withdrawERC20(address(mockToken), 100 * 10**18);
        assertEq(mockToken.balanceOf(address(deFiAgent)), 0);
    }

    function testGetTotalDeposited() public {
        vm.deal(user, 1 ether);
        vm.prank(user);
        deFiAgent.depositETH{value: 1 ether}();
        assertEq(deFiAgent.getTotalDeposited(), 1 ether);
    }

    function testEstimatedAPY() public {
        assertEq(deFiAgent.estimatedAPY(), 1000);
    }
}