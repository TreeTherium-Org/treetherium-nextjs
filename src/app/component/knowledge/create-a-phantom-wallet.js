import Section from "../../component/layouts/Section.js";
import Image from "next/image";
import styles from "./textstyle.module.css";

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
      <div className={styles.card}>
        <Image
          className={styles.cardImgTop}
          src="/assets/img/phantom-wallet.png"
          alt="Tree Image"
          width={600} 
          height={253}
          layout="responsive" 
        />
        <div className={styles.cardBody}>
          <div className={styles.divider} />
          <p className={styles.paragraph}>
            A Phantom Wallet is a widely trusted digital wallet on the Solana
            blockchain, designed for securely storing, managing, and using
            cryptocurrency. Known for its ease of use and security, Phantom
            allows TreeTherium users to interact seamlessly with the platform,
            whether it’s holding tokens, managing NFTs, or staking.
          </p>
          <p className={styles.title}>Why Choose Phantom?</p>
          <p className={styles.paragraph}>
            Phantom is the preferred wallet for TreeTherium users, as it
            supports everything needed for the platform. With Phantom, you can
            receive and store your $SEEDZ and $TREEZ tokens and hold NFTs linked
            to tree-planting projects. Designed specifically for Solana, Phantom
            provides fast transactions, low fees, and a user-friendly
            experience—making it ideal for both newcomers and crypto
            enthusiasts.
          </p>
          <p className={styles.title}>Getting Started With Phantom</p>
          <p className={styles.paragraph}>
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

