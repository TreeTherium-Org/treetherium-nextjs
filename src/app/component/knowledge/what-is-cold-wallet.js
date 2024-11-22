import Section from "../../component/layouts/Section.js";
import Image from "next/image";
import styles from "./textstyle.module.css";

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
      <div className={styles.card}>
        <Image
          className={styles.cardImgTop}
          src="/assets/img/cold-wallet.png"
          alt="Tree Image"
          width={600} 
          height={253}
          layout="responsive" 
          priority={true} 
        />
        <div className={styles.cardBody}>
          <div className={styles.divider} />
          <p className={styles.paragraph}>
            A cold wallet is a type of cryptocurrency wallet designed to keep
            your digital assets—like coins, tokens, and NFTs—extra secure by
            storing them offline. Unlike online wallets, which are connected to
            the internet and vulnerable to hacking, cold wallets are completely
            offline. This means that your private keys, which provide access to
            your crypto assets, are safely kept away from potential online
            threats.
          </p>
          <p className={styles.title}>
            How Does A Cold Wallet Keep Your Assets Safe?
          </p>
          <p className={styles.paragraph}>
            Cold wallets store your cryptocurrency keys on physical devices,
            like USB drives or specialized hardware wallets, that aren’t
            connected to the internet. By keeping your keys offline, cold
            wallets reduce the risk of hacking, phishing, and other cyber
            attacks. For anyone holding valuable assets like NFTs or a large
            amount of crypto, a cold wallet offers a secure way to protect your
            investments.
          </p>
          <p className={styles.paragraph}>
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
