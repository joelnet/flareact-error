import React from "react";
import { DebugLogs } from "../components/DebugLogs";
import Footer from "../components/Footer";
import { HasAccount } from "../components/HasAccount";
import { HasNoAccount } from "../components/HasNoAccount";
import { Head } from "../components/Head";
import { NftMiners } from "../components/NftMiners";
// import { RewardLogs } from "../components/RewardLogs";
import TopNav from "../components/TopNav";
import { useAccount } from "../hooks/useAccount";
import { useContract } from "../hooks/useContract";
import { useRoles } from "../hooks/useRoles";
import { TX_STATES } from "../lib/transactionStates";

export default function Account() {
  const account = useAccount();
  const { MINTER_ROLE } = useRoles();
  const startRef = React.createRef();
  const endRef = React.createRef();
  const [call, mintState] = useContract();

  const canClickMint =
    mintState !== TX_STATES.SIGN && mintState !== TX_STATES.PENDING;

  const onMint = async () => {
    call(({ nft }) =>
      nft.bulkSafeMint(account, startRef.current.value, endRef.current.value)
    );
  };

  return (
    <>
      <Head>
        <title>Account - Millionaire&apos;s Mining Club</title>
      </Head>
      <TopNav />

      <main>
        <h1>Millionaire&apos;s Mining Club</h1>

        <HasNoAccount>
          <h2 className="error">No Account Detected</h2>
          <p className="text-center">Login to gain access</p>
        </HasNoAccount>

        <HasAccount>
          <div className="button-bar text-center">
            {MINTER_ROLE && (
              <>
                <input ref={startRef} type="number" />
                <input ref={endRef} type="number" />
                <button
                  onClick={onMint}
                  className={`button-primary ${
                    mintState === TX_STATES.ERROR ? "error" : ""
                  }`}
                  disabled={!canClickMint}
                >
                  Mint
                </button>
              </>
            )}
          </div>

          <NftMiners />
          {/* <RewardLogs address={account} /> */}
        </HasAccount>
        <DebugLogs />
      </main>

      <Footer />
    </>
  );
}
