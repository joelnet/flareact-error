export const isWalletConnected = async (provider) => {
  if (provider == null) return false;
  const accounts = await provider.listAccounts();
  return accounts.length > 0;
};
