import Section from "../../component/layouts/Section.js";
import Image from "next/image";
import styles from "./textstyle.module.css";

const Jupiter = () => {
  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"Create A Jupiter Account"}
    >
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">
            &quot;swap it, bridge it, flip it&quot;
          </h3>
        </div>
      </div>
      <div className={styles.card}>
        <Image
          className={styles.cardImgTop}
          src="/assets/img/create-jupiter-account.png"
          alt="Tree Image"
          width={600} 
          height={253}
          layout="responsive"
        />
        <div className={styles.cardBody}>
          <div className={styles.divider} />
          <p className={styles.paragraph}>
            Jupiter is a powerful platform on the Solana blockchain that acts as
            an aggregator, helping users find the best rates for swapping or
            bridging tokens across various decentralized exchanges (DEXs). With
            Jupiter, you get access to a network of exchanges on Solana,
            ensuring you always get the most value when trading tokens.
          </p>
          <p className={styles.title}>Why Use Jupiter?</p>
          <p className={styles.paragraph}>
            Jupiter is the preferred choice for TreeTherium users when it comes
            to buying and managing $SEEDZ and $TREEZ tokens. With Jupiter, you
            can quickly swap between tokens or bridge assets to support your
            TreeTherium activities, all while getting the best available rates.
            It’s reliable, efficient, and designed to make navigating the Solana
            blockchain simple.
          </p>
          <p className={styles.title}>Getting Started With Jupiter</p>
          <p className={styles.paragraph}>
            To set up an account with Jupiter, connect your Phantom Wallet to
            the platform, and follow the easy steps to start swapping and
            bridging tokens. Once connected, you can explore the range of
            options Jupiter provides, ensuring you’re always getting the best
            deal as you support TreeTherium’s mission.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Jupiter;

