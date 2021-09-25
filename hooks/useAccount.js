import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";
import { isBrowser } from "../lib/isBrowser";
import { isWalletConnected } from "../lib/isWalletConnected";
import { useEthers } from "./useEthers";

const init = null;

const getAccount = async (provider, signer) => {
  const isConnected = await isWalletConnected(provider);
  const account = isConnected ? await signer.getAddress() : null;
  return account;
};

export const useAccountImpl = (defaultValue = init) => {
  const [provider, signer] = useEthers();
  const [account, setAccount] = useState(defaultValue);

  if (isBrowser()) {
    window.account = account;
  }

  useEffect(() => {
    if (provider == null || signer == null) return;

    getAccount(provider, signer)
      .then(setAccount)
      .catch((err) =>
        console.error("useAccount.js:useAccountImpl():setAccount()", err)
      );
  }, [provider, signer]);

  return account;
};

export const useAccount = singletonHook(init, useAccountImpl);
