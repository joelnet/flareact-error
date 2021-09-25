import { useNetworkState } from "../hooks/useNetworkState";

export const HasNoAccount = ({ children }) => {
  const state = useNetworkState();
  return state == "NOT_CONNECTED" ? children : null;
};
