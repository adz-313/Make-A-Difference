// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.9;

contract Request {
    string description;
    uint256 public value;
    address payable public recipient;
    bool public complete;
    uint256 public approvalCount;
    uint256 rejectionCount;
    mapping(address => bool) public approvals;

    constructor(
        string memory _description,
        uint256 _value,
        address payable _recipient
    ) public {
        description = _description;
        value = _value;
        recipient = _recipient;
        complete = false;
        approvalCount = 0;
        rejectionCount = 0;
    }

    function hasApproved(address _address) public view returns (bool) {
        return approvals[_address];
    }

    function approve(address _address) public {
        approvals[_address] = true;
        approvalCount++;
    }

    function reject(address _address) public {
        approvals[_address] = false;
        rejectionCount++;
    }

    function completeRequest() public {
        complete = true;
    }
}
