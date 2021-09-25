import { useState } from "react";
import { useEthers } from "../hooks/useEthers";
import { TX_STATES } from "../lib/transactionStates";

const connectContracts = (signer, contracts) => {
  const signedContracts = {};
  for (let key in contracts) {
    signedContracts[key] = contracts[key].connect(signer);
  }
  return signedContracts;
};

export const useContract = () => {
  const [, signer, contracts] = useEthers();
  const [state, setState] = useState([TX_STATES.IDLE, null, null]);

  const call = async (action) => {
    try {
      setState([TX_STATES.SIGN, null, null]);
      const connectedContracts = connectContracts(signer, contracts);
      const tx = await action(connectedContracts);

      setState([TX_STATES.PENDING, null, null]);
      const data = await tx.wait();

      setState([TX_STATES.SUCCESS, null, data]);
    } catch (err) {
      setState((s) => {
        console.error("useContract.js:call()", err);
        if (s[0] === TX_STATES.SIGN) return [TX_STATES.IDLE, null, null];
        return [TX_STATES.ERROR, err, null];
      });
    }
  };

  return [call, ...state];
};
