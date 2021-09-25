import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";
import { onMine } from "../events/onMine";
import { TX_STATES } from "../lib/transactionStates";
import { useAccount } from "./useAccount";
import { useEthers } from "./useEthers";
import { useNftminers } from "./useNftMiners";

const init = [null, TX_STATES.IDLE, {}];

export const useNftminersDataImpl = () => {
  const [[error, status, data], setState] = useState(init);
  const [errorNftMiners, statusNftMiners, nftMiners] = useNftminers();
  const account = useAccount();
  const [, , contracts] = useEthers();

  // Populate miner data
  useEffect(() => {
    console.log({ statusNftMiners });
    if (statusNftMiners !== TX_STATES.SUCCESS) return;

    let abort = false;

    async function getData() {
      try {
        for (let tokenId of nftMiners) {
          const lastMine = await contracts.nft.lastMine(tokenId);
          if (abort) return;
          setState((state) => [
            null,
            TX_STATES.PENDING,
            { ...state[2], [tokenId]: { lastMine } },
          ]);
        }

        setState((state) => [null, TX_STATES.SUCCESS, state[2]]);
      } catch (err) {
        console.error("useNftMinersData.js:getData()", err);
        setState((state) => [err, TX_STATES.ERROR, state[2]]);
      }
    }

    getData();

    const unsubscribeMine = onMine(contracts, account, getData);

    return () => {
      abort = true;
      unsubscribeMine();
    };
  }, [statusNftMiners]);

  if (errorNftMiners) {
    return [errorNftMiners, statusNftMiners, data];
  }

  return [error, status, data];
};

export const useNftminersData = singletonHook(init, useNftminersDataImpl);
