import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";
import {
  onIncomingTransfer,
  onOutboundTransfer,
} from "../events/onNftTransfer";
import { TX_STATES } from "../lib/transactionStates";
import { useAccount } from "./useAccount";
import { useEthers } from "./useEthers";

const init = [null, TX_STATES.IDLE, 0];

export const useNftminersCountImpl = () => {
  const [[error, status, count], setState] = useState(init);
  const account = useAccount();
  const [, signer, contracts] = useEthers();

  useEffect(() => {
    if (account == null) return;

    let abort = false;

    const fetchCount = async () => {
      try {
        setState((state) => [null, TX_STATES.PENDING, state[2]]);
        const count = await contracts.nft.connect(signer).balanceOf(account);
        if (abort) return;
        setState(() => [null, TX_STATES.SUCCESS, Number(count)]);
      } catch (err) {
        if (abort) return;
        console.error("useNftMinersCount.js:fetchCount", err);
        setState(() => [null, TX_STATES.ERROR, err]);
      }
    };

    fetchCount();

    const unsubscribeIn = onIncomingTransfer(contracts, account, fetchCount);
    const unsubscribeOut = onOutboundTransfer(contracts, account, fetchCount);

    return () => {
      abort = true;
      unsubscribeIn();
      unsubscribeOut();
    };
  }, [account, contracts, signer]);

  return [error, status, count];
};

export const useNftminersCount = singletonHook(init, useNftminersCountImpl);
