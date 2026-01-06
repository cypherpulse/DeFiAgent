// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DeFiAgent is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    address public immutable treasury;
    uint256 public constant PERFORMANCE_FEE_BPS = 75; // 0.75%

    mapping(address => bool) public isAgent;
    mapping(address => uint256) public userDepositETH;
    mapping(address => mapping(address => uint256)) public userDepositERC20;

    uint256 public totalDeposited;
    uint256 public totalYieldHarvested;
    uint256 public totalFeesCollected;

    modifier onlyOwnerOrAgent() {
        require(msg.sender == owner() || isAgent[msg.sender], "Not owner or agent");
        _;
    }

    event Deposited(address indexed user, address token, uint256 amount);
    event YieldHarvested(address indexed agent, uint256 yieldAmount, uint256 fee);
    event AgentGranted(address indexed agent);
    event AgentRevoked(address indexed agent);

    constructor(address _treasury) Ownable(msg.sender) {
        treasury = _treasury;
    }

    function depositETH() external payable {
        userDepositETH[msg.sender] += msg.value;
        totalDeposited += msg.value;
        emit Deposited(msg.sender, address(0), msg.value);
    }

    function depositERC20(address token, uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        userDepositERC20[msg.sender][token] += amount;
        totalDeposited += amount; // Assuming 1:1 for simplicity, in reality might need price feeds
        emit Deposited(msg.sender, token, amount);
    }

    function grantAgent(address agent) external onlyOwner {
        isAgent[agent] = true;
        emit AgentGranted(agent);
    }

    function revokeAgent(address agent) external onlyOwner {
        isAgent[agent] = false;
        emit AgentRevoked(agent);
    }

    function agentHarvest(uint256 yieldAmount) external onlyOwnerOrAgent nonReentrant {
        require(yieldAmount > 0, "Yield must be positive");
        totalYieldHarvested += yieldAmount;
        uint256 fee = (yieldAmount * PERFORMANCE_FEE_BPS) / 10000;
        totalFeesCollected += fee;
        // In a real implementation, this would transfer the fee to treasury
        // For now, assume the yield is in ETH or handled externally
        // payable(treasury).transfer(fee); // If yield is ETH
        emit YieldHarvested(msg.sender, yieldAmount, fee);
    }

    function agentRebalance() external onlyOwnerOrAgent {
        // Placeholder for strategy moves
        // Implement rebalancing logic here
    }

    function withdrawETH(uint256 amount) external onlyOwner {
        require(amount <= address(this).balance, "Insufficient balance");
        payable(owner()).transfer(amount);
    }

    function withdrawERC20(address token, uint256 amount) external onlyOwner {
        require(amount <= IERC20(token).balanceOf(address(this)), "Insufficient balance");
        IERC20(token).safeTransfer(owner(), amount);
    }

    function getTotalDeposited() external view returns (uint256) {
        return totalDeposited;
    }

    function getUserBalance(address user) external view returns (uint256 ethBalance, uint256[] memory erc20Balances) {
        ethBalance = userDepositETH[user];
        // For simplicity, return balances for all tokens, but in practice, track tokens
        // This is a placeholder; real implementation would need to track deposited tokens per user
        erc20Balances = new uint256[](0); // Placeholder
    }

    function estimatedAPY() external pure returns (uint256) {
        // Placeholder: return a fixed APY, e.g., 10%
        return 1000; // 10% in basis points
    }
}