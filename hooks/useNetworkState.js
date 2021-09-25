import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";
import networks from "../config/networks.json";
import { useAccount } from "../hooks/useAccount";
import { useEthers } from "./useEthers";

const STATE = {
  INIT: "INIT",
  LOADING: "LOADING",
  CONNECTED: "CONNECTED",
  NOT_CONNECTED: "NOT_CONNECTED",
  ERROR: "ERROR",
  WRONG_NETWORK: "WRONG_NETWORK",
};

const init = STATE.INIT;

export const useNetworkStateImpl = () => {
  const [provider, signer] = useEthers();
  const account = useAccount();
  const [state, setState] = useState(init);

  useEffect(() => {
    if (provider == null || signer == null) return;

    let abort = false;

    const loadAccount = async () => {
      try {
        setState(STATE.LOADING);

        if (abort) return;

        const network = await provider.getNetwork();

        if (network == null || network.chainId in networks === false) {
          setState(STATE.WRONG_NETWORK);
          console.error(
            new Error(`ChainID ${network.chainId} is not supported.`)
          );
          return;
        }

        setState(account ? STATE.CONNECTED : STATE.NOT_CONNECTED);
      } catch (err) {
        console.error("useAccount.js:useAccountImpl():setAccount()", err);
        setState(STATE.ERROR);
      }
    };

    loadAccount();

    return () => {
      abort = true;
    };
  }, [provider, signer, account]);

  return state;
};

export const useNetworkState = singletonHook(init, useNetworkStateImpl);
