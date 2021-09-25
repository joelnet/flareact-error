import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";
import { onBlock } from "../events/onBlock";
import { useEthers } from "./useEthers";

const init = 0;

const useBlockNumberImpl = (defaultValue = init) => {
  const [blockNumber, setBlockNumber] = useState(defaultValue);
  const [provider] = useEthers();

  useEffect(() => {
    if (!provider) return;

    const unsubscribe = onBlock(provider, setBlockNumber);
    provider.getBlockNumber().then(setBlockNumber);

    return () => {
      unsubscribe();
    };
  }, [provider]);

  return blockNumber;
};

export const useBlockNumber = singletonHook(init, useBlockNumberImpl);
