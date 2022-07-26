// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Billboards{

    event Transaction(address from, address receiver, uint billboardID, uint amount, string message, uint256 timestamp, Billboard [] _billboards);
    event Creation(address creator, uint startingPrice);

    receive() external payable {}

    uint private currPrice;
    uint private transactionCount;
    address private founder;
    address private currentOwner;


    struct Billboard {
        uint purchasePrice;
        address owner;
        string message;
        uint timestamp;
    } 

    Billboard[] public billboards;

    constructor() payable {
        founder = msg.sender;
        currentOwner = msg.sender;
        currPrice = 0.00173598 ether;
        transactionCount = 0;
        emit Creation(founder,currPrice);
    }

    function createBoard(address _newOwner, uint _purchasePrice, string memory _message) private{

        transactionCount++;
        billboards.push(Billboard(_purchasePrice,_newOwner, _message, block.timestamp));
        uint _billboardID = transactionCount;

        currentOwner = _newOwner;
        currPrice = _purchasePrice;
        emit Transaction(msg.sender, payable(founder), _billboardID, _purchasePrice, _message, block.timestamp, billboards);

    }

    function buyBoard(uint _newPrice, string memory _message) public payable{
        require(_newPrice > currPrice && msg.value >= _newPrice);

        (bool success, bytes memory data) = payable(founder).call{gas: 3000000, value:_newPrice}("");
        require(success,"Call failed");
        createBoard(msg.sender, _newPrice, _message);
    }

    function getFounder() public view returns (address){
        return founder;
    }

    function getCurrOwner() public view returns (address){
        return currentOwner;
    }

    function getCurrPrice() public view returns (uint){
        return currPrice;
    }

    function getBillboardCount() public view returns (uint){
        return transactionCount;
    }

    function getAllBillboards() public view returns (Billboard [] memory){
        return billboards;
    }
}