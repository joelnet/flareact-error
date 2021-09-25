export const calculateReward = ({ lastMine, blockReward, blockNumber }) => {
  if (lastMine === 0 || blockReward === 0 || blockNumber === 0) return "0";
  const reward = ethers.BigNumber.from(blockNumber)
    .sub(lastMine)
    .mul(blockReward);
  return reward;
};
