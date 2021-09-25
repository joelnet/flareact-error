// import Link from "flareact/link";
import Card from "../components/Card";
import Footer from "../components/Footer";
import { Head } from "../components/Head";
import { Nft } from "../components/Nft";
import { Timeline } from "../components/Timeline";
import { TimelineItem } from "../components/TimelineItem";
import TopNav from "../components/TopNav";
// import config from "../config/hardhat.json";

export default function Index() {
  // const coinAddress = config.networks.mumbai.MillionairesMiningClubCoin.address;

  return (
    <>
      <Head>
        <title>Millionaire&apos;s Mining Club</title>
      </Head>

      <TopNav />

      <main>
        <h1>Millionaire&apos;s Mining Club</h1>

        <h3 className="subtitle">NFT Collectibles that Mine Cryptocurrency</h3>

        <Card>
          <div className="image">
            <img src="/nifty-miner-001.png" />
          </div>
          <div className="text">
            <h2 className="text-left">
              What is Millionaire&apos;s Mining Club?
            </h2>
            <p>
              Millionaire&apos;s Mining Club is a set of rare collectible
              ERC-721
              <strong className="text-primary"> Nifty Miners </strong>. What
              separates
              <strong className="text-primary"> Nifty Miners </strong> from
              other NFTs is their ability to mine real Cryptocurrency (
              <strong className="text-primary">MMC Coin</strong>).
            </p>
            <div>
              <a
                href="https://testnets.opensea.io/collection/mining-club-002"
                className="button-primary"
              >
                Browse Marketplace
              </a>
            </div>
          </div>
        </Card>

        <p className="margin-y-4 text-center">
          Every Nifty Miners Generates One Million MMC Coins a Year!
        </p>

        <Card>
          <div className="image">
            <img src="/cryptocurrency_2268313.svg" />
          </div>
          <div className="text">
            <h2 className="text-left">What is the MMC Coin?</h2>
            <p>
              The <strong className="text-primary">MMC Coin</strong> is an
              ERC-20 Token mined using a Millionaire&apos;s Mining Club
              <strong className="text-primary"> Nifty Miner </strong>. The only
              way <strong className="text-primary">MMC Coins</strong> are
              created is with with
              <strong className="text-primary"> Nifty Miners </strong> and
              staking.
            </p>
          </div>
        </Card>

        <Card>
          <div className="image" style={{ height: "auto" }}>
            <ul className="nft-list list-style-none text-center">
              <Nft id={0} />
            </ul>
          </div>
          <div className="text" style={{ minHeight: 360 }}>
            <h2 className="text-left">How does it work?</h2>
            <p>
              After acquiring, the
              <strong className="text-primary"> Nifty Miner </strong> will
              immediately go to work for you, generating One Million
              <strong className="text-primary"> MMC Coins </strong> per year.
            </p>
            <p>
              Rewards are per block and managed in your dashboard. With a single
              click, the MMC Cryptocurrency is deposited in your wallet.
            </p>
            <p>
              The
              <strong className="text-primary"> MMC Coin </strong> can then be
              used just like every other ERC-20 Token because it is an ERC-20
              Token!
            </p>
          </div>
        </Card>

        {/* <Card>
        <div className="text text-center">
          <h2 className="text-center">Official MMC Coin address</h2>
          <p>
            Add <strong className="text-primary"> MMC Coin </strong> to your
            wallet using the official
            <strong className="text-primary"> MMC Coin </strong> address.
          </p>
          <p>
            <Link href={`https://etherscan.io/token/${coinAddress}`}>
              <a>{coinAddress}</a>
            </Link>
          </p>
        </div>
      </Card> */}

        <h2>Roadmap</h2>

        <Timeline>
          <TimelineItem time="Q4 2021" flag="Launch on Polygon">
            Launch on Polygon and auction of limited Founders Edition Nifty
            Miners on OpenSea.
          </TimelineItem>
          <TimelineItem time="Q4 2021" flag="Staking Rewards">
            Staking rewards program on Polygon for MMC Coin holders.
          </TimelineItem>
          <TimelineItem time="Q4 2021" flag="Liquidity Pool">
            Create liquidity pool on TBD DEX on Polygon.
          </TimelineItem>
          <TimelineItem time="Q4 2021" flag="Nifty Miner Auction">
            A round of 1,000 Nifty Miners on Polygon to be auctioned on OpenSea.
          </TimelineItem>
          <TimelineItem time="Q4 2021" flag="Launch on Ethereum">
            Launch on Ethereum.
          </TimelineItem>
          <TimelineItem time="Q4 2021" flag="Nifty Miner Auction">
            A round of 1,000 Nifty Miners on Ethereum to be auctioned on
            OpenSea.
          </TimelineItem>
          <TimelineItem time="Q4 2021" flag="Liquidity Pool">
            Create liquidity pool on TBD DEX on Ethereum.
          </TimelineItem>
          <TimelineItem time="Q1 2022" flag="Cross-Chain Bridge">
            Polygon Ethereum bridge allows cross-chain MMC Coin and Nift Miner
            transfers.
          </TimelineItem>
          <TimelineItem time="Q2 2022" flag="Nift Miner Auction">
            Next round 1,000 of Nifty Miners to be auctioned for MMC Coin.
          </TimelineItem>
          <TimelineItem time="Q2 2022" flag="Launch on ?">
            Launch on next Blockchain Platform (to be determined).
          </TimelineItem>
        </Timeline>
      </main>

      <Footer />
    </>
  );
}
