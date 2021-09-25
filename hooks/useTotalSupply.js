import { useEffect, useState } from "react";
import { useEthers } from "../hooks/useEthers";

export const useTotalSupply = () => {
  const [, , contracts] = useEthers();
  const [totalSupply, setTotalSupply] = useState("0");

  useEffect(() => {
    if (contracts == null) return;
    contracts.coin
      .totalSupply()
      .then(ethers.utils.formatEther)
      .then(setTotalSupply)
      .catch((err) => {
        console.error("useTotalSupply.js:contracts.coin.totalSupply()", err);
      });
  }, [contracts]);

  return totalSupply;
};
