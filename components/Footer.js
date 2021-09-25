import Link from "flareact/link";

const Footer = () => {
  return (
    <footer className="margin-top-2">
      <div className="row">
        <div className="col-4">
          <p>
            <strong className="text-primary">Links</strong>
          </p>
          <ul className="list-style-none">
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            <li>
              <Link href="/connect">
                <a>Connect</a>
              </Link>
            </li>
            <li>
              <Link href="/account">
                <a>Account</a>
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy">
                <a>Privacy Policy</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-4">
          <p>
            <strong className="text-primary">Social</strong>
          </p>

          <ul className="list-style-none">
            <li>
              <Link href="https://twitter.com/miningclubapp">
                <a>Twitter</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-4">
          <p>
            <strong className="text-primary">Market</strong>
          </p>

          <ul className="list-style-none">
            <li>
              <Link href="https://opensea.io/">
                <a>OpenSea</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
