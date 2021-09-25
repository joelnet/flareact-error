import { useEffect, useState } from "react";
import { singletonHook } from "react-singleton-hook";
import config from "../config/hardhat.json";
import networks from "../config/networks.json";
import { abi as coinAbi } from "../contracts/MillionairesMiningClubCoin.json";
import { abi as nftAbi } from "../contracts/MillionairesMiningClubNft.json";

const getNetworkName = async (provider) => {
  const { chainId } = await provider.getNetwork();
  const network = networks[chainId];
  return network == null ? "unknown" : network.name;
};

const getCoinContract = async (provider) => {
  const network = await getNetworkName(provider);
  if (network === "unknown") return null;
  const { address } = config.networks[network].MillionairesMiningClubCoin;
  return new ethers.Contract(address, coinAbi, provider);
};

const getNftContract = async (provider) => {
  const network = await getNetworkName(provider);
  if (network === "unknown") return null;
  const { address } = config.networks[network].MillionairesMiningClubNft;
  return new ethers.Contract(address, nftAbi, provider);
};

const init = [];

export const useEthersImpl = () => {
  const [state, setState] = useState(init);

  useEffect(() => {
    if (typeof window.ethereum === "undefined") return;

    const run = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contracts = {
        coin: await getCoinContract(provider),
        nft: await getNftContract(provider),
      };

      setState([provider, signer, contracts.coin === null ? null : contracts]);

      // DEBUG
      window.provider = window.provider || provider;
      window.signer = window.signer || signer;
      window.contracts = window.contracts || contracts;
    };

    run().catch(console.error);
  }, []);

  return state;
};

export const useEthers = singletonHook(init, useEthersImpl);
