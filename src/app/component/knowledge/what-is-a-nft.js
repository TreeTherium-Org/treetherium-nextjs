import Section from "../../component/layouts/Section.js";
import Image from "next/image";
import styles from "./textstyle.module.css";

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
      <div className={styles.card}>
        <Image
          className={styles.cardImgTop}
          src="/assets/img/what-is-nft.png"
          alt="Tree Image"
          width={600} 
          height={253}
          layout="responsive" 
          priority={true} 
        />
        <div className={styles.cardBody}>
          <div className={styles.divider} />
          <p className={styles.paragraph}>
            An NFT, or Non-Fungible Token, is a unique digital asset that
            represents ownership of a specific item, artwork, collectible, or
            even real-world object like a planted tree. Unlike cryptocurrencies
            like Bitcoin or Ethereum, which are fungible (interchangeable with
            each other), each NFT is one-of-a-kind and cannot be replicated.
            This uniqueness gives NFTs their value and makes them a powerful
            tool for proving ownership and authenticity in the digital world.
          </p>
          <p className={styles.title}>How NFTs Work On The Blockchain</p>
          <p className={styles.paragraph}>
            NFTs are stored on a blockchain, which acts as a secure digital
            ledger that records each transaction and ownership history. The most
            common blockchains for NFTs are Ethereum and Solana, although new
            platforms are emerging. When an NFT is created, or
            &quot;minted&quot;, it’s given a unique identifier on the
            blockchain. This identifier is tied to the digital asset, creating a
            permanent, unchangeable record of ownership. Because of this, NFTs
            offer a level of transparency and trust that traditional ownership
            models can’t provide.
          </p>
          <p className={styles.title}>Decentralization: No Central Authority</p>
          <p className={styles.paragraph}>
            Unlike traditional databases managed by a single organization,
            blockchain is decentralized. This means that no single entity
            controls the network. Instead, multiple nodes (computers) work
            together to validate and record transactions. Decentralization makes
            blockchain more secure, as data is spread across the network and
            protected from single points of failure or manipulation.
          </p>
          <p className={styles.title}>
            NFTs In TreeTherium: Building Your Planted & Digital Forest
          </p>
          <p className={styles.paragraph}>
            In TreeTherium, NFTs are used to represent each user account, each
            tree you plant, and each project you participate in. These NFTs are
            more than just digital collectibles—they’re proof of your
            environmental impact. Every tree planted, every project joined, and
            every achievement within TreeTherium becomes a part of your personal
            &quot;Planted Forest,&quot; creating a digital record of your
            commitment to reforestation.
          </p>
          <p className={styles.title}>Immutable Data Linked To Each NFT</p>
          <p className={styles.paragraph}>
            Each TreeTherium NFT holds a wealth of data tied to the individual
            tree or project it represents. This data includes details like the
            planter’s name, date of germination, potting and planting dates,
            multimedia such as pictures and videos, weather conditions, and
            project involvement. All of this information is securely stored on
            the blockchain, creating an immutable, verifiable record of each
            tree’s journey and its environmental contributions.
          </p>
          <p className={styles.title}>Why NFTs Matter For The Future</p>
          <p className={styles.paragraph}>
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