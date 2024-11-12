import Section from "../../component/layouts/Section.js";

const WhatIsANFT = () => {
  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"Create a SafePal Wallet"}
    >
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">
            &quot;your crypto safe environment&quot;
          </h3>
        </div>
      </div>
      <div style={styles.card}>
        <img
          style={styles.cardImgTop}
          src="/assets/img/safepal_wallet.png"
          alt="Tree Image"
        />
        <div style={styles.cardBody}>
          <div style={styles.divider} />
          <p style={styles.paragraph}>
            SafePal is one of the world’s leading crypto wallets, known for its
            high security and user-friendly design. Trusted by users worldwide,
            SafePal offers both hot (online) and cold (offline) wallet options,
            making it an ideal choice for managing, storing, and protecting your
            digital assets. One of the reasons SafePal stands out is its close
            connection to Binance, the largest centralized exchange (CEX)
            globally. This partnership provides seamless compatibility with
            Binance’s platform, making it easy for users to manage their assets
            securely and efficiently.
          </p>
          <p style={styles.title}>
            Why SafePal Is Among The Best Crypto Wallets
          </p>
          <p style={styles.paragraph}>
            SafePal wallets are designed with top-notch security features to
            protect your cryptocurrency from online threats. The SafePal Cold
            Wallet, in particular, is completely offline, providing an extra
            layer of protection by keeping your private keys out of reach from
            hackers and phishing attempts. This makes SafePal’s cold wallets
            some of the safest options available, ideal for those looking to
            securely store large amounts of crypto or valuable NFTs for the long
            term.
          </p>
          <p style={styles.title}>SafePal And Binance: A Powerful Connection</p>
          <p style={styles.paragraph}>
            As a Binance-backed wallet, SafePal provides direct integration with
            the Binance platform, allowing users to easily access their assets,
            trade, and track their portfolio within the SafePal ecosystem. This
            connection means SafePal users get the best of both worlds—a secure,
            independent wallet backed by the world’s largest crypto exchange.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default WhatIsANFT;

const styles = {
  card: {
    backgroundColor: "#fff" /* White background for the card */,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" /* Soft shadow */,
    borderRadius: "10px 10px 0 0",
    textAlign: "left" /* Left-align content */,
    padding: "0" /* Inner padding */,
    maxWidth: "100%" /* Max width for the card */,
    margin: "21px 20px 100px",
  },
  cardImgTop: {
    height: "253px",
    borderRadius: "10px 10px 0 0",
    objectFit: "cover",
    width: "100%",
  },
  cardBody: {
    padding: "0 20px",
  },
  title: {
    fontSize: "1.125em",
    fontWeight: 700,
    color: "#4F3738",
    padding: "0 0 8px",
    marginBottom: "0px",
    textTransform: "capitalize",
  },
  divider: {
    width: "100%",
    height: "4px",
    margin: "15px 0 11px",
    borderRadius: "50px",
    backgroundColor: "#e7e1ee",
  },
  paragraph: {
    fontSize: "1.125em",
    fontWeight: 400,
    color: "#4F3738",
    padding: "0 0 15px",
    marginBottom: "0px",
  },
  paragraphLast: {
    fontSize: "1.125em",
    fontWeight: 400,
    color: "#4F3738",
    padding: "0 0 25px",
    marginBottom: "0px",
  },
  // Adding a responsive layout to make sure the text and dividers adjust well to screen size
  "@media (min-width: 600px)": {
    card: {
      maxWidth: "80%", // Limit card width on medium screens
    },
  },
  "@media (min-width: 1024px)": {
    card: {
      maxWidth: "600px", // Limit card width on larger screens
    },
    title: {
      fontSize: "1.5rem",
    },
    page: {
      fontSize: "1.125rem",
    },
    paragraph: {
      fontSize: "1.125rem",
    },
  },
};
