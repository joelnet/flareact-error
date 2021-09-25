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

  contracts.coin.on(filter, callback);

  const unsubscribe = () => {
    contracts.coin.off(filter, callback);
  };

  return unsubscribe;
};

export const onOutboundTransfer = (contracts, address, callback) => {
  const { id, hexZeroPad } = ethers.utils;

  const filter = {
    address,
    topics: [id("Transfer(address,address,uint256)"), hexZeroPad(address, 32)],
  };

  contracts.coin.on(filter, callback);

  const unsubscribe = () => {
    contracts.coin.off(filter, callback);
  };

  return unsubscribe;
};
