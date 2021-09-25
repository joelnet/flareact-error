export const onMine = (contracts, address, callback) => {
  const { id, hexZeroPad } = ethers.utils;

  const filter = {
    address,
    topics: [id("Mint(address,uint256,uint256)"), hexZeroPad(address, 32)],
  };

  contracts.nft.on(filter, callback);

  const unsubscribe = () => {
    contracts.nft.off(filter, callback);
  };

  return unsubscribe;
};

export const onMineToken = (contracts, address, tokenId, callback) => {
  const { BigNumber, utils } = ethers;
  const { id, hexZeroPad } = utils;

  const _tokenId = hexZeroPad(BigNumber.from(tokenId).toHexString(), 32);

  const filter = {
    address,
    topics: [
      id("Mint(address,uint256,uint256)"),
      hexZeroPad(address, 32),
      _tokenId,
    ],
  };

  contracts.nft.on(filter, callback);

  const unsubscribe = () => {
    contracts.nft.off(filter, callback);
  };

  return unsubscribe;
};
