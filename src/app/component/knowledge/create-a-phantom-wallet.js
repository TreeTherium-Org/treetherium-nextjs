import Section from "../../component/layouts/Section.js";
import Image from "next/image";

const Phantom = () => {
  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"Create A Phantom Wallet"}
    >
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">
            &quot;pure security & speed from the Solana blockchain&quot;
          </h3>
        </div>
      </div>
      <div style={styles.card}>
        <Image
          style={styles.cardImgTop}
          src="/assets/img/phantom-wallet.png"
          alt="Tree Image"
          width={600} 
          height={253}
          layout="responsive" 
        />
        <div style={styles.cardBody}>
          <div style={styles.divider} />
          <p style={styles.paragraph}>
            A Phantom Wallet is a widely trusted digital wallet on the Solana
            blockchain, designed for securely storing, managing, and using
            cryptocurrency. Known for its ease of use and security, Phantom
            allows TreeTherium users to interact seamlessly with the platform,
            whether it’s holding tokens, managing NFTs, or staking.
          </p>
          <p style={styles.title}>Why Choose Phantom?</p>
          <p style={styles.paragraph}>
            Phantom is the preferred wallet for TreeTherium users, as it
            supports everything needed for the platform. With Phantom, you can
            receive and store your $SEEDZ and $TREEZ tokens and hold NFTs linked
            to tree-planting projects. Designed specifically for Solana, Phantom
            provides fast transactions, low fees, and a user-friendly
            experience—making it ideal for both newcomers and crypto
            enthusiasts.
          </p>
          <p style={styles.title}>Getting Started With Phantom</p>
          <p style={styles.paragraph}>
            To create your Phantom Wallet, download the app or browser
            extension, follow the setup instructions, and securely store your
            secret recovery phrase. This phrase is essential for accessing your
            wallet, so keep it private and safe. Once your wallet is set up,
            you’re ready to join the TreeTherium community, receive NFTs, and
            support reforestation projects through $SEEDZ and $TREEZ.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Phantom;

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
