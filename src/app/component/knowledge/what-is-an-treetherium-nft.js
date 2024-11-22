import Section from "../../component/layouts/Section.js";
import Image from "next/image";
import styles from "./textstyle.module.css";

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
      <div className={styles.card}>
        <Image
          className={styles.cardImgTop}
          src="/assets/img/what-is-treetherium-nft.png"
          alt="Tree Image"
          width={600} 
          height={253}
          layout="responsive" 
          priority={true} 
        />
        <div className={styles.cardBody}>
          <div className={styles.divider} />
          <p className={styles.paragraph}>
            An NFT, or Non-Fungible Token, is a unique digital asset stored on
            the blockchain that cannot be replicated. Unlike cryptocurrencies,
            each NFT is one-of-a-kind and represents ownership of a specific
            item or piece of data. In TreeTherium, NFTs serve as digital
            certificates, verifying each user’s contributions to reforestation
            and conservation.
          </p>
          <p className={styles.title}>NFTs In Your Planted Forest</p>
          <p className={styles.paragraph}>
            With TreeTherium, each user account, every tree you plant, and every
            project you join becomes an NFT. These NFTs are collectible tokens
            that represent your personal &quot;Planted Forest&quot;, showcasing
            your journey and impact on the environment. Each NFT acts as a
            permanent, digital record of your contribution, and you can view and
            share your achievements with others.
          </p>
          <p className={styles.title}>Immutable Data Connected To Your NFTs</p>
          <p className={styles.paragraph}>
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

