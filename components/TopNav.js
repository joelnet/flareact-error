import Link from "flareact/link";
import { useRouter } from "flareact/router";
import { useAccount } from "../hooks/useAccount";
import { useBalance } from "../hooks/useBalance";
import { useNetworkState } from "../hooks/useNetworkState";
import { shortAccount } from "../lib/shortAccount";

export default function TopNav() {
  const accountState = useNetworkState();
  const account = useAccount();
  const [, , shortBalance] = useBalance();
  const router = useRouter();

  const isConnected = accountState === "CONNECTED";
  const isWrongNetwork = accountState === "WRONG_NETWORK";
  const isConnectPage = router.pathname === "/connect";

  return (
    <>
      <nav>
        <ul>
          <li className="float-left">
            <Link href="/">
              <a>
                <img src="/cryptocurrency_2268313.svg" className="logo-small" />
              </a>
            </Link>
          </li>
          {isConnected && (
            <>
              <li key="balance">{shortBalance} MMC</li>
              <li key="account">
                <Link href="/account">
                  <a className="address">{shortAccount(account)}</a>
                </Link>
              </li>
            </>
          )}
          {isWrongNetwork && (
            <li key="connect">
              <Link href="/connect" prefetch={true}>
                <a className={`button-primary error`}>Wrong Network</a>
              </Link>
            </li>
          )}
          {!isWrongNetwork && !account && !isConnectPage && (
            <li key="connect">
              <Link href="/connect" prefetch={true}>
                <a className={`button-primary`}>Connect to a wallet</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
}
