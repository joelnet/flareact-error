import Footer from "../components/Footer";
import { Head } from "../components/Head";
import TopNav from "../components/TopNav";

const PrivacyPolicy = () => {
  return (
    <>
      <Head>
        <title>Millionaire&apos;s Mining Club</title>
      </Head>

      <TopNav />
      <main>
        <h1>Privacy Policy</h1>
        <p>Last updated: September 24, 2021</p>
        <p>We don&apos;t care about you. We don&apos;t collect any data.</p>

        <h2 className="margin-top-2">Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, You can contact
          us on Twitter:{" "}
          <a
            href="https://twitter.com/miningclubapp"
            rel="external nofollow noopener noreferrer"
            target="_blank"
          >
            https://twitter.com/miningclubapp
          </a>
        </p>
      </main>

      <Footer />
    </>
  );
};

export default PrivacyPolicy;
