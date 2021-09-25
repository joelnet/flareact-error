import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";
import { useAccount } from "../hooks/useAccount";
import { useEthers } from "../hooks/useEthers";
import { useNftminersCount } from "../hooks/useNftMinersCount";
import { TX_STATES, isDone } from "../lib/transactionStates";

const init = [null, TX_STATES.IDLE, new Set()];

export const useNftminersImpl = () => {
  const [[error, status, miners], setState] = useState(init);
  const account = useAccount();
  const [, , contracts] = useEthers();
  const [countError, countStatus, count] = useNftminersCount();

  // Populate miners
  useEffect(() => {
    if (!isDone(countStatus)) return;

    let abort = false;

    const getTokens = async () => {
      try {
        if (abort) return;
        setState([null, TX_STATES.PENDING, new Set()]);
        console.log({ count });

        for (let i = 0; i < count; i++) {
          const tokenId = await contracts.nft.tokenOfOwnerByIndex(account, i);
          if (abort) return;
          setState((state) => {
            const miners = state[2];
            const nextMiners = new Set(miners.add(tokenId.toString()));
            return [null, TX_STATES.PENDING, nextMiners];
          });
        }

        setState((state) => [state[0], TX_STATES.SUCCESS, state[2]]);
      } catch (err) {
        console.error("useNftMiners.js:getTokens()", err);
        setState((state) => [err, TX_STATES.ERROR, state[2]]);
      }
    };

    getTokens();

    return () => {
      abort = true;
    };
  }, [countStatus]);

  if (countError) {
    return [countError, countStatus, miners];
  }

  return [error, status, miners];
};

export const useNftminers = singletonHook(init, useNftminersImpl);
