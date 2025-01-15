// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("VoteModule", (m) => {
    const vote = m.contract("VotingSystem",[["0xa36c94Fff82a3919b7F61bEfbCDe21E371614aBe"]]);
});