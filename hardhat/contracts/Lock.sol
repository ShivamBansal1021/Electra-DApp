// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VotingSystem{

    address[] public admins;

    constructor(address[] memory _admins) {
        admins.push(msg.sender);
        for(uint i=0; i<_admins.length; i++)
            admins.push(_admins[i]);
    }

    modifier onlyAdmin() {
        bool admin = false;
        for(uint i=0; i<admins.length; i++)
        {
            if(msg.sender == admins[i])
            {
                admin = true;
                break;
            }
        }
        require(admin == true, "Access Denied");
        _;
    }

    struct Candidate{
        uint256 id;
        string name;
        uint256 voteCount;
    }

    struct Election{
        uint256 id;
        string post;
        bool isActive;
        uint startTime;
        uint endTime;
        Candidate[] candidates;
        mapping(address => bool) hasVoted;
    }

    mapping(uint => Election) public elections;
    uint public electionCount;
    

    modifier isActiveElection(uint _electionId) {
        require(elections[_electionId].isActive, "Election is not active");
        require(
            block.timestamp >= elections[_electionId].startTime && 
            block.timestamp <= elections[_electionId].endTime,
            "Election is not within the active time frame"
        );
        _;
    }

    modifier electionExists(uint _electionId) {
        require(_electionId>=0&&_electionId<electionCount, "Election does not exist");
        _;
    }

    function createElection(string memory _post, uint _startTime, uint _endTime) public onlyAdmin{
        Election storage newElection = elections[electionCount];
        require(_endTime > _startTime, "End time must be after start time");
        require(_startTime > block.timestamp, "Start time must be in the future");
        newElection.id = electionCount;
        newElection.post = _post;
        newElection.startTime = _startTime;
        newElection.endTime = _endTime;
        newElection.isActive = false;
        electionCount++;
    }

    function addCandidate(uint _electionId, string memory _name) public onlyAdmin electionExists(_electionId){
        Election storage election = elections[_electionId];
        require(!election.isActive,"Cannot add candidates while election is active");
        election.candidates.push(Candidate({
            id: election.candidates.length,
            name: _name,
            voteCount: 0
        }));
    }

    function startElection(uint _electionId) public onlyAdmin electionExists(_electionId) {
        Election storage election = elections[_electionId];
        require(!election.isActive, "Election is already active");
        require(block.timestamp >= election.startTime, "Election start time has not been reached");
        require(block.timestamp <= election.endTime, "Election time frame is over");

        election.isActive = true;
    }

    function endElection(uint _electionId) public onlyAdmin electionExists(_electionId) {
        Election storage election = elections[_electionId];
        require(election.isActive, "Election is already inactive");
        require(block.timestamp >= election.endTime, "Election end time has not been reached");
        election.isActive = false;
    }

    function vote(uint _electionId, uint _candidateId) public electionExists(_electionId) isActiveElection(_electionId){
        Election storage election = elections[_electionId];
        require(!election.hasVoted[msg.sender], "You have already voted");
        require(_candidateId>=0&&_candidateId<election.candidates.length,"Invalid Candidate Id");
        election.hasVoted[msg.sender] = true;
        election.candidates[_candidateId].voteCount++;
    }

    function getCandidates(uint _electionId) public view electionExists(_electionId) returns (string[] memory) 
    {
        Election storage election = elections[_electionId];
    uint candidateCount = election.candidates.length;

    string[] memory names = new string[](candidateCount);
    for (uint i = 0; i < candidateCount; i++) {
        names[i] = election.candidates[i].name;
    }

    return names;
    }

    function getResults(uint _electionId) public view electionExists(_electionId) returns (Candidate[] memory) 
    {
        Election storage election = elections[_electionId];
        require(!election.isActive, "Election is still active");
        require(block.timestamp >= election.endTime, "Cannot show results before end time");

        return election.candidates;
    }

}