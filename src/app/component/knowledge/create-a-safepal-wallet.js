import Section from "../../component/layouts/Section.js";
import Image from "next/image";
import styles from "./textstyle.module.css";

const SafePal = () => {
  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"Create a SafePal Wallet"}
    >
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">
            &quot;your crypto safe environment&quot;
          </h3>
        </div>
      </div>
      <div className={styles.card}>
        <Image
          className={styles.cardImgTop}
          src="/assets/img/safepal_wallet.png"
          alt="Tree Image"
          width={600}
          height={253}
          layout="responsive"
          priority={true}
        />
        <div className={styles.cardBody}>
          <div className={styles.divider} />
          <p className={styles.paragraph}>
            SafePal is one of the world’s leading crypto wallets, known for its
            high security and user-friendly design. Trusted by users worldwide,
            SafePal offers both hot (online) and cold (offline) wallet options,
            making it an ideal choice for managing, storing, and protecting your
            digital assets. One of the reasons SafePal stands out is its close
            connection to Binance, the largest centralized exchange (CEX)
            globally. This partnership provides seamless compatibility with
            Binance’s platform, making it easy for users to manage their assets
            securely and efficiently.
          </p>
          <p className={styles.title}>
            Why SafePal Is Among The Best Crypto Wallets
          </p>
          <p className={styles.paragraph}>
            SafePal wallets are designed with top-notch security features to
            protect your cryptocurrency from online threats. The SafePal Cold
            Wallet, in particular, is completely offline, providing an extra
            layer of protection by keeping your private keys out of reach from
            hackers and phishing attempts. This makes SafePal’s cold wallets
            some of the safest options available, ideal for those looking to
            securely store large amounts of crypto or valuable NFTs for the long
            term.
          </p>
          <p className={styles.title}>SafePal And Binance: A Powerful Connection</p>
          <p className={styles.paragraph}>
            As a Binance-backed wallet, SafePal provides direct integration with
            the Binance platform, allowing users to easily access their assets,
            trade, and track their portfolio within the SafePal ecosystem. This
            connection means SafePal users get the best of both worlds—a secure,
            independent wallet backed by the world’s largest crypto exchange.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default SafePal;
