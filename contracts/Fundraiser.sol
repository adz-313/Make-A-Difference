// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Fundraiser is Ownable {
    using SafeMath for uint256;
    struct Donation {
        uint256 value;
        uint256 date;
    }

    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    mapping(address => Donation[]) private _donations;

    Request[] public requests;
    string public name;
    string public imageURL;
    string public description;
    address payable public beneficiary;
    uint256 public totalDonations;
    uint256 public donationsCount;
    uint256 public minimumContribution;
    uint256 public targetToAchieve;
    address[] public contributers;
    mapping(address => bool) public approvers;
    uint256 public approversCount;

    event DonationReceived(address indexed donor, uint256 value);
    event Withdraw(uint256 amount);

    constructor(
        string memory _name,
        string memory _imageURL,
        string memory _description,
        // uint256 _minimumContribution,
        uint256 _targetToAchieve,
        address _owner,
        address payable _beneficiary
    ) public {
        name = _name;
        imageURL = _imageURL;
        description = _description;
        beneficiary = _beneficiary;
        // minimumContribution = _minimumContribution;
        targetToAchieve = _targetToAchieve;
        transferOwnership(_owner);
    }

    function setBeneficiary(address payable _beneficiary) public onlyOwner {
        beneficiary = _beneficiary;
    }

    function myDonationsCount() public view returns (uint256) {
        return _donations[msg.sender].length;
    }

    function donate() external payable {
        // require(msg.value > minimumContribution);

        Donation memory donation =
            Donation({value: msg.value, date: block.timestamp});
        _donations[msg.sender].push(donation);
        totalDonations = totalDonations.add(msg.value);
        donationsCount++;

        emit DonationReceived(msg.sender, msg.value);
    }

    function myDonations()
        public
        view
        returns (uint256[] memory values, uint256[] memory dates)
    {
        uint256 count = myDonationsCount();
        values = new uint256[](count);
        dates = new uint256[](count);

        for (uint256 i = 0; i < count; i++) {
            Donation storage donation = _donations[msg.sender][i];
            values[i] = donation.value;
            dates[i] = donation.date;
        }

        return (values, dates);
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        beneficiary.transfer(balance);
        totalDonations = 0;
        emit Withdraw(balance);
    }

    receive() external payable {
        totalDonations = totalDonations.add(msg.value);
        donationsCount++;
    }

    function createRequest(string memory _description, uint _value, address payable _recipient) public onlyOwner {
        Request storage newRequest = requests.push();
        newRequest.description = _description;
        newRequest.value = _value;
        newRequest.recipient = _recipient;
        newRequest.complete = false;
        newRequest.approvalCount = 0;
    }

    function approveRequest(uint index) public {
        require(approvers[msg.sender]);
        require(!requests[index].approvals[msg.sender]);

        requests[index].approvals[msg.sender] = true;
        requests[index].approvalCount++;
    }

    function finalizeRequest(uint index) public onlyOwner{
        require(requests[index].approvalCount > (approversCount / 2));
        require(!requests[index].complete);

        requests[index].recipient.transfer(requests[index].value);
        requests[index].complete = true;

    }

    function getRequestsCount() public view returns (uint){
        return requests.length;
    }
}
