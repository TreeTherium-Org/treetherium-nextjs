import Section from "../../component/layouts/Section.js";
import Image from "next/image";

const TreeTheriumNFT = () => {
  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"What Is A TreeTherium NFT?"}
    >
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">
            &quot;once planted, the data is immutable&quot;
          </h3>
        </div>
      </div>
      <div style={styles.card}>
        <Image
          style={styles.cardImgTop}
          src="/assets/img/what-is-treetherium-nft.png"
          alt="Tree Image"
          width={600} 
          height={253}
          layout="responsive" 
          priority={true} 
        />
        <div style={styles.cardBody}>
          <div style={styles.divider} />
          <p style={styles.paragraph}>
            An NFT, or Non-Fungible Token, is a unique digital asset stored on
            the blockchain that cannot be replicated. Unlike cryptocurrencies,
            each NFT is one-of-a-kind and represents ownership of a specific
            item or piece of data. In TreeTherium, NFTs serve as digital
            certificates, verifying each user’s contributions to reforestation
            and conservation.
          </p>
          <p style={styles.title}>NFTs In Your Planted Forest</p>
          <p style={styles.paragraph}>
            With TreeTherium, each user account, every tree you plant, and every
            project you join becomes an NFT. These NFTs are collectible tokens
            that represent your personal &quot;Planted Forest&quot;, showcasing
            your journey and impact on the environment. Each NFT acts as a
            permanent, digital record of your contribution, and you can view and
            share your achievements with others.
          </p>
          <p style={styles.title}>Immutable Data Connected To Your NFTs</p>
          <p style={styles.paragraph}>
            Every NFT holds detailed, unchangeable information related to the
            trees you plant. This includes data such as the planter’s name, date
            of germination, potting and planting dates, and even multimedia like
            pictures and videos of the growing tree. Additional details, like
            local weather conditions and whether the tree is part of a larger
            project, are also stored. This information is securely registered on
            the blockchain, providing proof of your environmental impact and
            making it available for future reference.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default TreeTheriumNFT;

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
