import { isBrowser } from "../lib/isBrowser";

export const BrowserOnly = ({ children }) => (isBrowser() ? children : null);
