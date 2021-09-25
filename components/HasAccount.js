import { useNetworkState } from "../hooks/useNetworkState";

export const HasAccount = ({ children }) => {
  const state = useNetworkState();
  return state == "CONNECTED" ? children : null;
};
