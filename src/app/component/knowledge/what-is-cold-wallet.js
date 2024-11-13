import Section from "../../component/layouts/Section.js";
import Image from "next/image";

const ColdWallet = () => {
  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"What Is A Cold Wallet"}
    >
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">
            &quot;safety first, take it offline&quot;
          </h3>
        </div>
      </div>
      <div style={styles.card}>
        <Image
          style={styles.cardImgTop}
          src="/assets/img/cold-wallet.png"
          alt="Tree Image"
          width={600} 
          height={253}
          layout="responsive" 
          priority={true} 
        />
        <div style={styles.cardBody}>
          <div style={styles.divider} />
          <p style={styles.paragraph}>
            A cold wallet is a type of cryptocurrency wallet designed to keep
            your digital assets—like coins, tokens, and NFTs—extra secure by
            storing them offline. Unlike online wallets, which are connected to
            the internet and vulnerable to hacking, cold wallets are completely
            offline. This means that your private keys, which provide access to
            your crypto assets, are safely kept away from potential online
            threats.
          </p>
          <p style={styles.title}>
            How Does A Cold Wallet Keep Your Assets Safe?
          </p>
          <p style={styles.paragraph}>
            Cold wallets store your cryptocurrency keys on physical devices,
            like USB drives or specialized hardware wallets, that aren’t
            connected to the internet. By keeping your keys offline, cold
            wallets reduce the risk of hacking, phishing, and other cyber
            attacks. For anyone holding valuable assets like NFTs or a large
            amount of crypto, a cold wallet offers a secure way to protect your
            investments.
          </p>
          <p style={styles.paragraph}>
            Cold wallets are ideal for long-term storage, providing peace of
            mind that your assets remain safe, even if they’re out of reach for
            daily transactions. They’re a go-to choice for those serious about
            protecting their digital assets against online vulnerabilities.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default ColdWallet;

const styles = {
  card: {
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "10px 10px 0 0",
    textAlign: "left",
    padding: "0",
    maxWidth: "100%",
    margin: "21px 20px 100px",
  },
  cardImgTop: {
    borderRadius: "10px 10px 0 0",
    objectFit: "cover",
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
    textAlign: "justify", 
  },
  paragraphLast: {
    fontSize: "1.125em",
    fontWeight: 400,
    color: "#4F3738",
    padding: "0 0 25px",
    marginBottom: "0px",
    textAlign: "justify", 
  },
  "@media (min-width: 600px)": {
    card: {
      maxWidth: "80%",
    },
  },
  "@media (min-width: 1024px)": {
    card: {
      maxWidth: "600px",
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
