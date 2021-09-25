import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";
import { useBlockNumber } from "../hooks/useBlockNumber";
import { useBlockReward } from "../hooks/useBlockReward";
import { useNftminersData } from "../hooks/useNftminersData";
import { calculateReward } from "../lib/calculateReward";
import { TX_STATES } from "../lib/transactionStates";

const init = [0, ""];

const useTotalRewardImpl = () => {
  const [[totalReward, formattedTotalReward], setTotalReward] = useState(init);
  const [, nftMinerDataStatus, data] = useNftminersData();
  const blockReward = useBlockReward();
  const blockNumber = useBlockNumber();

  useEffect(() => {
    if (
      nftMinerDataStatus !== TX_STATES.SUCCESS &&
      nftMinerDataStatus !== TX_STATES.PENDING
    )
      return;
    if (typeof blockReward !== "object") return;
    if (blockNumber === 0) return;

    let abort = false;

    const compRewards = () => {
      setTotalReward([ethers.BigNumber.from(0), "0"]);

      for (let [, { lastMine }] of Object.entries(data)) {
        if (abort) return;
        const reward = calculateReward({ lastMine, blockReward, blockNumber });

        setTotalReward((totalReward) => {
          const nextReward = totalReward[0].add(reward);
          const formatted = ethers.utils.formatEther(nextReward);
          return [nextReward, formatted];
        });
      }
    };

    compRewards();

    return () => {
      abort = true;
    };
  }, [data, blockReward, blockNumber]);

  return [totalReward, formattedTotalReward];
};

export const useTotalReward = singletonHook(init, useTotalRewardImpl);
