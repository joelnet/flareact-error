import { Nft } from "../components/Nft";
import { Spinner } from "../components/Spinner";
import { useContract } from "../hooks/useContract";
import { useNftminers } from "../hooks/useNftMiners";
import { useTotalReward } from "../hooks/useTotalReward";
import { getShortBalance } from "../lib/getShortBalance";
import { TX_STATES } from "../lib/transactionStates";

const NftMinersEmpty = () => {
  return (
    <div className="text-center">
      <p>
        UH OH! It looks like you don&apos;t have any{" "}
        <strong className="text-primary">MMC Miners</strong> yet.
      </p>
      <img src="/money_3156065.svg" style={{ height: 200 }} />
      <p>
        Follow us on Twitter{" "}
        <a href="https://twitter.com/miningclubapp">@miningclubapp</a>
        <br /> for alerts on new{" "}
        <strong className="text-primary">MMC Miners</strong> releases.
      </p>
    </div>
  );
};

const NftMinersNotEmpty = ({ nfts }) => {
  const [, formattedTotalReward] = useTotalReward();
  const shortTotalRewards = getShortBalance(formattedTotalReward);
  const [call, mineState] = useContract();

  const isPending = mineState === TX_STATES.PENDING;
  const canClickMine =
    mineState !== TX_STATES.SIGN && mineState !== TX_STATES.PENDING;

  const onMine = async () => {
    call((contracts) => contracts.nft.mineAll());
  };

  return (
    <>
      <p className="text-center">*Potential Rewards: {shortTotalRewards} MMC</p>

      {isPending ? <Spinner /> : null}

      <p className="text-center">
        <button
          onClick={onMine}
          className={`button-primary ${
            mineState === TX_STATES.ERROR ? "error" : ""
          }`}
          disabled={!canClickMine}
        >
          Collect Rewards
        </button>
      </p>

      <div>
        <ul className="nft-list list-style-none text-center">
          {[...nfts].map((nft) => {
            return (
              <li key={nft}>
                <Nft id={nft} />
              </li>
            );
          })}
        </ul>
      </div>

      <p className="text-center">* Rewards are an approximation.</p>
    </>
  );
};

export const NftMiners = () => {
  const [, nftMinersStatus, nfts] = useNftminers();
  const hasMiners = nfts.size !== 0;

  if (
    nftMinersStatus === TX_STATES.IDLE ||
    (nftMinersStatus === TX_STATES.PENDING && !hasMiners)
  ) {
    return <p className="text-center">Loading...</p>;
  }

  return hasMiners ? <NftMinersNotEmpty nfts={nfts} /> : <NftMinersEmpty />;
};
