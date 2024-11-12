import Section from "../../component/layouts/Section.js";

const WhatIsANFT = () => {
  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"What Is An NFT"}
    >
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">
            &quot;build a legacy, digitize your forest&quot;
          </h3>
        </div>
      </div>
      <div style={styles.card}>
        <img
          style={styles.cardImgTop}
          src="/assets/img/what-is-nft.png"
          alt="Tree Image"
        />
        <div style={styles.cardBody}>
          <div style={styles.divider} />
          <p style={styles.paragraph}>
            An NFT, or Non-Fungible Token, is a unique digital asset that
            represents ownership of a specific item, artwork, collectible, or
            even real-world object like a planted tree. Unlike cryptocurrencies
            like Bitcoin or Ethereum, which are fungible (interchangeable with
            each other), each NFT is one-of-a-kind and cannot be replicated.
            This uniqueness gives NFTs their value and makes them a powerful
            tool for proving ownership and authenticity in the digital world.
          </p>
          <p style={styles.title}>How NFTs Work On The Blockchain</p>
          <p style={styles.paragraph}>
            NFTs are stored on a blockchain, which acts as a secure digital
            ledger that records each transaction and ownership history. The most
            common blockchains for NFTs are Ethereum and Solana, although new
            platforms are emerging. When an NFT is created, or "minted," it’s
            given a unique identifier on the blockchain. This identifier is tied
            to the digital asset, creating a permanent, unchangeable record of
            ownership. Because of this, NFTs offer a level of transparency and
            trust that traditional ownership models can’t provide.
          </p>
          <p style={styles.title}>Decentralization: No Central Authority</p>
          <p style={styles.paragraph}>
            Unlike traditional databases managed by a single organization,
            blockchain is decentralized. This means that no single entity
            controls the network. Instead, multiple nodes (computers) work
            together to validate and record transactions. Decentralization makes
            blockchain more secure, as data is spread across the network and
            protected from single points of failure or manipulation.
          </p>
          <p style={styles.title}>
            NFTs In TreeTherium: Building Your Planted & Digital Forest
          </p>
          <p style={styles.paragraph}>
            In TreeTherium, NFTs are used to represent each user account, each
            tree you plant, and each project you participate in. These NFTs are
            more than just digital collectibles—they’re proof of your
            environmental impact. Every tree planted, every project joined, and
            every achievement within TreeTherium becomes a part of your personal
            "Planted Forest," creating a digital record of your commitment to
            reforestation.
          </p>
          <p style={styles.title}>Immutable Data Linked To Each NFT</p>
          <p style={styles.paragraph}>
            Each TreeTherium NFT holds a wealth of data tied to the individual
            tree or project it represents. This data includes details like the
            planter’s name, date of germination, potting and planting dates,
            multimedia such as pictures and videos, weather conditions, and
            project involvement. All of this information is securely stored on
            the blockchain, creating an immutable, verifiable record of each
            tree’s journey and its environmental contributions.
          </p>
          <p style={styles.title}>Why NFTs Matter For The Future</p>
          <p style={styles.paragraph}>
            NFTs offer a groundbreaking way to establish ownership, verify
            authenticity, and support transparency in digital and real-world
            projects. In platforms like TreeTherium, NFTs provide a trusted,
            decentralized way for users to connect with meaningful projects and
            see the impact of their contributions. As NFTs continue to grow in
            popularity, they represent a future where ownership is more
            accessible, secure, and environmentally aligned.
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
