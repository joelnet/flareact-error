import { useEffect, useState } from "react";
import networks from "../config/networks.json";
import { onMineToken } from "../events/onMine";
import { useAccount } from "../hooks/useAccount";
import { useBlockNumber } from "../hooks/useBlockNumber";
import { useBlockReward } from "../hooks/useBlockReward";
import { useEthers } from "../hooks/useEthers";
import { calculateReward } from "../lib/calculateReward";
import { getShortBalance } from "../lib/getShortBalance";
import { isBrowser } from "../lib/isBrowser";
import nftsData from "../config/nfts.json";

export const Nft = ({ id }) => {
  const [provider, , contracts] = useEthers();
  const account = useAccount();
  const [lastMine, setLastMine] = useState(0);
  const blockReward = useBlockReward();
  const blockNumber = useBlockNumber(0);
  const [sellUri, setSelluri] = useState(null);

  const src = `/${nftsData[id].image}`;

  const onClick = () => {
    location.href = sellUri;
  };

  useEffect(() => {
    if (provider == null || contracts == null || account == null) return;

    const getLastMine = async () => {
      try {
        const nextLastMine = await contracts.nft.lastMine(id);
        setLastMine(nextLastMine);

        const { chainId } = await provider.getNetwork();
        const { openSeaUrl } = networks[chainId];

        setSelluri(`${openSeaUrl}${contracts.nft.address}/${id}`);
      } catch (err) {
        console.error(`account.js:getLastMine(${id})`, err);
      }
    };

    getLastMine();
    const unsubscribe = onMineToken(contracts, account, id, getLastMine);

    return () => {
      unsubscribe();
    };
  }, [provider, contracts, account]);

  const reward = isBrowser()
    ? ethers.utils.formatEther(
        calculateReward({ lastMine, blockReward, blockNumber })
      )
    : 0;
  const shortReward = isBrowser() ? getShortBalance(reward) : "0";

  return (
    <div>
      <div className="miner" onClick={onClick}>
        <div className="miner-name">Founders Edition</div>
        <img src={src} />
        <div className="text-primary">{Number(id) + 1} / 100</div>
      </div>
      {reward > 0 && <div>reward: {shortReward}</div>}
    </div>
  );
};
