import Link from "flareact/link";
import { useState } from "react";
import { BrowserOnly } from "../components/BrowserOnly";
import { DebugLogs } from "../components/DebugLogs";
import Footer from "../components/Footer";
import { Head } from "../components/Head";
import TopNav from "../components/TopNav";
import { useNetworkState } from "../hooks/useNetworkState";
import { walletState } from "../lib/walletState";

const NoWallet = () => {
  return (
    <>
      <h2 className="error">⚠️ No Wallet Detected</h2>
      <div className="text-center">
        <p>
          A MetaMask compatible wallet is required
          <br /> to connect to the Millionaire&apos;s Mining Club.
        </p>
        <p>
          <a
            href="https://metamask.io/download.html"
            className="button-primary"
          >
            Download MetaMask
          </a>
        </p>
      </div>
    </>
  );
};

const HasWallet = () => {
  const networkState = useNetworkState();
  const [error, setError] = useState(null);

  console.log({ networkState });

  const isConnected = networkState === "CONNECTED";
  const isNotConnected = networkState === "NOT_CONNECTED";
  const isWrongNetwork = networkState === "WRONG_NETWORK";

  const connect = async () => {
    try {
      setError(null);
      await ethereum.request({ method: "eth_requestAccounts" });
      location.reload();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <div className="text-center">
        {isWrongNetwork && (
          <>
            <h2 className="error">Wrong Network</h2>
            <div>
              <img src="/blue-screen_4319124.svg" style={{ height: 200 }} />
            </div>
            <p>Please connect to the appropriate Polygon network.</p>
          </>
        )}

        {!isWrongNetwork && (
          <div className="text-center">
            <img src="digital-wallet_1651920.svg" width="200px" />
          </div>
        )}

        {isConnected && (
          <>
            <p>✅ Wallet is Connected</p>
            <div>
              <Link href="/account" prefetch={false}>
                <a className="button-primary">Go to Account</a>
              </Link>
            </div>
          </>
        )}

        {isNotConnected && (
          <>
            <button className="button-primary" onClick={connect}>
              Connect Wallet
            </button>
            {error && <div className="error">{error}</div>}
          </>
        )}
      </div>
      <DebugLogs />
    </>
  );
};

export default function Connect() {
  console.log({ walletState: walletState() });
  const isWalletDetected = walletState() === "WALLET";

  return (
    <>
      <Head>
        <title>Millionaire&apos;s Mining Club</title>
      </Head>

      <TopNav />

      <main>
        <h1>Connect to Millionaire&apos;s Mining Club</h1>

        <BrowserOnly>
          {isWalletDetected ? <HasWallet /> : <NoWallet />}
        </BrowserOnly>
      </main>

      <Footer />
    </>
  );
}
