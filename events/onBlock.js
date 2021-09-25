export const onBlock = (provider, callback) => {
  provider.on("block", callback);

  const unsubscribe = () => {
    provider.off("block", callback);
  };

  return unsubscribe;
};
