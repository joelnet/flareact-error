import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";
import networks from "../config/networks.json";
import { useEthers } from "../hooks/useEthers";

const init = "0";

export const useBlockRewardImpl = () => {
  const [provider] = useEthers();
  const [blockReward, setBlockReward] = useState(init);

  useEffect(() => {
    if (provider == null) return;

    const loadBlockReward = async () => {
      try {
        const { chainId } = await provider.getNetwork();
        const { blockReward } = networks[chainId];
        setBlockReward(ethers.BigNumber.from(blockReward));
      } catch (err) {
        console.error("useBlockReward.js:loadBlockReward", err);
      }
    };

    loadBlockReward();
  }, [provider]);

  return blockReward;
};

export const useBlockReward = singletonHook(init, useBlockRewardImpl);
