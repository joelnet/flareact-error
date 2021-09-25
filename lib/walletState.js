const STATES = {
  SERVER: "SERVER",
  NO_WALLET: "NO_WALLET",
  WALLET: "WALLET",
};

export const walletState = () => {
  if (typeof window === "undefined") {
    return STATES.SERVER;
  }
  if (typeof window.ethereum === "undefined") {
    return STATES.NO_WALLET;
  }
  return STATES.WALLET;
};
