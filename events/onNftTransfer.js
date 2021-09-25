export const onIncomingTransfer = (contracts, address, callback) => {
  const { id, hexZeroPad } = ethers.utils;

  const filter = {
    address,
    topics: [
      id("Transfer(address,address,uint256)"),
      null,
      hexZeroPad(address, 32),
    ],
  };

  contracts.nft.on(filter, callback);

  const unsubscribe = () => {
    contracts.nft.off(filter, callback);
  };

  return unsubscribe;
};

export const onOutboundTransfer = (contracts, address, callback) => {
  const { id, hexZeroPad } = ethers.utils;

  const filter = {
    address,
    topics: [id("Transfer(address,address,uint256)"), hexZeroPad(address, 32)],
  };

  contracts.nft.on(filter, callback);

  const unsubscribe = () => {
    contracts.nft.off(filter, callback);
  };

  return unsubscribe;
};
