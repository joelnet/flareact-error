const getShortBalanceString = (balance = "") => {
  const match = balance.match(/\d+\.[\d]{1,4}/);
  return match ? Number(match[0]).toString() : "0";
};

const getShortBalanceNumber = (balance = 0) =>
  getShortBalanceString(balance.toString());

const getShortBalanceBigNumber = (balance) =>
  getShortBalanceString(ethers.utils.formatEther(balance));

export const getShortBalance = (balance = "") =>
  typeof balance === "string" ? getShortBalanceString(balance)
  : typeof balance === "number" ? getShortBalanceNumber(balance)
  : getShortBalanceBigNumber(balance); // prettier-ignore
