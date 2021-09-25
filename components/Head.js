import FlareactHead from "flareact/head";

export const Head = ({ children }) => (
  <>
    <FlareactHead>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&amp;display=swap"
        rel="stylesheet"
      />
      <link href="/styles.css?x=14" rel="stylesheet" />
      <script src="https://www.unpkg.com/web3@1.4.0/dist/web3.min.js"></script>
      <script src="https://cdn.ethers.io/lib/ethers-5.0.umd.min.js"></script>
      {children}
    </FlareactHead>
  </>
);
