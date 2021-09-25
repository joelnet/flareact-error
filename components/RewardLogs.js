import { useRewardLogs } from "../hooks/useRewardLogs";
import { shortAccount } from "../lib/shortAccount";

const RewardLog = ({ log }) => {
  const reward = ethers.utils.formatEther(log.args[2]);
  const blockHash = log.blockHash;
  const shortBlockHash = shortAccount(blockHash);

  const etherScanUrl = `https://etherscan.io/tx/${blockHash}`;

  return (
    <>
      <strong className="text-primary">+{reward} MMC</strong>
      <span className="text-pad">in block</span>
      <a href={etherScanUrl}>{shortBlockHash}</a>
    </>
  );
};

export const RewardLogs = ({ address }) => {
  const rewardLogs = useRewardLogs({ address });

  if (rewardLogs.length === 0) return null;

  return (
    <>
      <h2 className="margin-top-2">Recent Rewards</h2>
      <ul>
        {rewardLogs.map((log) => (
          <li key={log.blockHash} className="text-center">
            <RewardLog log={log} />
          </li>
        ))}
      </ul>
    </>
  );
};
