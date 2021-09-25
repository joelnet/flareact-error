import { useEffect, useState } from "react";
import { useBlockNumber } from "../hooks/useBlockNumber";
import { useEthers } from "../hooks/useEthers";
import { onMine } from "../events/onMine";

const blocksPerDay = 6504;
const rewardLogPeriod = blocksPerDay * 90;

const groupLogs = (state, log) => {
  if (log.blockHash in state === false) {
    state[log.blockHash] = { ...log };
  } else {
    const args = [...state[log.blockHash].args];
    args[2] = args[2].add(log.args[2]);
    state[log.blockHash].args = args;
  }
  return state;
};

export const useRewardLogs = ({ address }) => {
  const [, , contracts] = useEthers();
  const [transactions, setTransactions] = useState([]);
  const blockNumber = useBlockNumber();

  useEffect(() => {
    if (contracts == null || address == null || blockNumber === 0) return;

    let abort = false;

    const loadTransactions = async () => {
      try {
        const filter = contracts.coin.filters.Transfer(
          "0x0000000000000000000000000000000000000000",
          address
        );

        const start = Math.max(1, blockNumber - rewardLogPeriod);
        const transactions = await contracts.coin.queryFilter(filter, start);

        if (abort) return;
        const grouped = transactions.reduce(groupLogs, {});
        const groupedArray = Object.values(grouped);

        setTransactions(groupedArray);
      } catch (err) {
        console.error("useRewardLogs.js:loadTransactions", err);
      }
    };

    loadTransactions();
    const unsubscribeMine = onMine(contracts, address, loadTransactions);

    return () => {
      abort = true;
      unsubscribeMine();
    };
  }, [contracts, address, blockNumber]);

  return transactions;
};
