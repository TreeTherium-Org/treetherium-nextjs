import Section from "../../component/layouts/Section.js";
import Image from "next/image";

const Raydium = () => {
  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"Create A Raydium DEX Account"}
    >
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">&quot;DEX is the way forward&quot;</h3>
        </div>
      </div>
      <div style={styles.card}>
        <Image
          style={styles.cardImgTop}
          src="/assets/img/DEX-raydium.png"
          alt="Tree Image"
          width={600}
          height={253}
          layout="responsive"
        />
        <div style={styles.cardBody}>
          <div style={styles.divider} />
          <p style={styles.paragraph}>
            Raydium is a decentralized exchange (DEX) built on the Solana
            blockchain, offering fast, low-cost trading for a variety of
            Solana-based tokens. As a DEX, Raydium allows users to trade crypto
            directly with one another, without the need for a central authority
            or intermediary. This makes trading more secure, transparent, and
            gives you full control over your assets.
          </p>
          <p style={styles.title}>What Does A DEX Do?</p>
          <p style={styles.paragraph}>
            A DEX, or decentralized exchange, connects buyers and sellers
            directly on the blockchain. Unlike traditional exchanges, DEXs don’t
            hold your assets; instead, trades happen directly between users.
            This decentralized approach enhances security and reduces
            transaction fees, making it a preferred choice for many crypto
            users. With Raydium, all transactions are powered by Solana’s
            high-speed network, ensuring quick trades and minimal costs.
          </p>
          <p style={styles.title}>Why Raydium For TreeTherium?</p>
          <p style={styles.paragraph}>
            Raydium is our preferred DEX for trading $SEEDZ and $TREEZ tokens.
            Its integration with Solana ensures you benefit from fast
            transactions and competitive fees, essential for a smooth
            TreeTherium experience. As a TreeTherium user, Raydium provides you
            with a reliable, user-friendly platform to manage your tokens and
            support environmental projects effortlessly.
          </p>
          <p style={styles.title}>Getting Started On Raydium</p>
          <p style={styles.paragraph}>
            To start, connect your Phantom Wallet to Raydium. This will give you
            instant access to trading, staking, and other features. Once
            connected, you’re ready to trade tokens, explore liquidity pools,
            and actively participate in the TreeTherium community.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Raydium;

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
