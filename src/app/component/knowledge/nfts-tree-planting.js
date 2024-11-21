import Section from "../../component/layouts/Section.js";
import Image from "next/image";
import styles from "./textstyle.module.css";

const NFT = () => {
  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"NFT's & Tree Planting"}
    >
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">
            &quot;immutable digital ownership&quot;
          </h3>
        </div>
      </div>
      <div className={styles.card}>
        <Image
          className={styles.cardImgTop}
          src="/assets/img/nfts-tree-planting.png"
          alt="Tree Image"
          width={600}
          height={253}
          layout="responsive"
          priority={true}
        />
        <div className={styles.cardBody}>
          <div className={styles.divider} />
          <p className={styles.paragraph}>
            At TreeTherium, both projects, land plots and individual trees are
            represented by unique NFTs. Each plot of land approved for planting
            receives its own NFT, which certifies its role in our reforestation
            network. On top of that, each tree planted on this land is minted as
            a separate NFT, creating a digital record for every tree’s journey
            from seedling to maturity. This dual NFT provides complete
            transparency and ensures that every part of your impact is
            verifiable on the blockchain.
          </p>
          <p className={styles.title}>NFT is value</p>
          <p className={styles.paragraph}>
            By owning an NFT tied to a specific plot or individual tree, you
            gain access to detailed data about each tree’s health, growth rate,
            and environmental impact. This allows you to follow the progress of
            your trees directly on the TreeTherium platform, making the digital
            ownership of trees a meaningful and engaging experience.
          </p>
          <p className={styles.title}>NFT rewards</p>
          <p className={styles.paragraph}>
            These NFTs also come with rewards. As your trees grow, you may
            receive rewards in $TREEZ or $SEEDZ tokens, letting you earn while
            contributing to positive environmental change. This approach makes
            it easy to support reforestation and participate in a sustainable,
            green economy.
          </p>
          <p className={styles.title}>Start planting and make an Impact</p>
          <p className={styles.paragraphLast}>
            Join TreeTherium today to tokenize your own land or garden and tree
            NFTs. Plant trees, and grow a lasting impact on our planet. Register
            now and be part of a greener future!
          </p>
        </div>
      </div>
    </Section>
  );
};

export default NFT;