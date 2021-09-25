import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";
import {
  onIncomingTransfer,
  onOutboundTransfer,
} from "../events/onCoinTransfer";
import { getShortBalance } from "../lib/getShortBalance";
import { useAccount } from "./useAccount";
import { useEthers } from "./useEthers";

const init = [0, "0", "0"];

export const useBalanceImpl = () => {
  const [, , contracts] = useEthers();
  const account = useAccount();
  const [[balance, humanReadableBalance, shortBalance], setBalance] =
    useState(init);

  useEffect(() => {
    if (contracts == null || account == null) return;

    const getBalance = async () => {
      try {
        const balance = await contracts.coin.balanceOf(account);
        const humanReadableBalance = ethers.utils.formatEther(balance);
        const shortBalance = getShortBalance(humanReadableBalance);
        setBalance([balance, humanReadableBalance, shortBalance]);
      } catch (err) {
        console.error("useBalance.js:getBalance()", err);
      }
    };

    getBalance();

    const unsubscribeIn = onIncomingTransfer(contracts, account, getBalance);
    const unsubscribeOut = onOutboundTransfer(contracts, account, getBalance);

    return () => {
      unsubscribeIn();
      unsubscribeOut();
    };
  }, [contracts, account]);

  return [balance, humanReadableBalance, shortBalance];
};

export const useBalance = singletonHook(init, useBalanceImpl);
