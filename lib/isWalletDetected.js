import { isBrowser } from "./isBrowser";

export const isWalletDetected = () => {
  if (!isBrowser()) return false;
  console.log("isWalletDetected ", typeof ethereum !== "undefined");

  return typeof ethereum !== "undefined";
};
