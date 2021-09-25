import { useRouter } from "flareact/router";
import { useEffect } from "react";
import Footer from "../../components/Footer";
import { Head } from "../../components/Head";
import { Nft } from "../../components/Nft";
import TopNav from "../../components/TopNav";
import nftData from "../../config/nfts.json";

const isValidTokenId = (tokenId) => tokenId != null && tokenId in nftData;

export const getEdgeProps = async ({ params }) => {
  const { tokenId } = params;

  const numberTokenId = Math.round(Number(tokenId));
  const notFound = !isValidTokenId(tokenId);

  return {
    props: {
      tokenId: numberTokenId,
    },
    notFound,
  };
};

export default function Token({ tokenId }) {
  const router = useRouter();

  useEffect(() => {
    // HACK: Flareact can't do a server side redirect.
    if (typeof window !== "undefined" && !isValidTokenId(tokenId)) {
      router.push("/");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Millionaire&apos;s Mining Club</title>
      </Head>

      <TopNav />

      <main>
        <h1>Founders Edition Nifty Miner</h1>

        <div className="text-center margin-top-2">
          <ul className="nft-list list-style-none text-center">
            <Nft id={tokenId} />
          </ul>
        </div>
      </main>

      <Footer />
    </>
  );
}
