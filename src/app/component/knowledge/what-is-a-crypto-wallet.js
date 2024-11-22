import Section from "../../component/layouts/Section.js";
import Image from "next/image";
import styles from "./textstyle.module.css";

const WhatIsACryptoWallet = () => {
  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"What Is A Crypto Wallet"}
    >
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">&quot;your keys your wallet&quot;</h3>
        </div>
      </div>
      <div className={styles.card}>
        <Image
          className={styles.cardImgTop}
          src="/assets/img/what-is-a-crypto-wallet.png"
          alt="Tree Image"
          width={600} 
          height={253}
          layout="responsive" 
          priority={true} 
        />
        <div className={styles.cardBody}>
          <div className={styles.divider} />
          <p className={styles.paragraph}>
            A crypto wallet is a digital tool that allows you to securely store,
            manage, and use cryptocurrencies like Bitcoin, Ethereum, and
            TreeTherium tokens. Unlike a physical wallet, a crypto wallet
            doesn’t store the actual coins. Instead, it stores the private
            keys—unique codes that give you access to your cryptocurrency on the
            blockchain.
          </p>
          <p className={styles.title}>How Do Crypto Wallets Work?</p>
          <p className={styles.paragraph}>
            Crypto wallets work by generating a pair of keys: a public key,
            which acts like an address you can share to receive funds, and a
            private key, which is your personal code to access your funds. Think
            of the private key as your password—it’s essential to keep it safe,
            as anyone with access to it can control your crypto assets.
          </p>
          <p className={styles.title}>Types of Crypto Wallets</p>
          <p className={styles.paragraph}>
            There are two main types of crypto wallets: hot wallets and cold
            wallets. Hot wallets are connected to the internet, making them
            convenient for quick access and transactions. Cold wallets, on the
            other hand, are offline and offer enhanced security, ideal for
            long-term storage of larger amounts.
          </p>
          <p className={styles.title}>Why Do You Need a Crypto Wallet?</p>
          <p className={styles.paragraphLast}>
            A crypto wallet gives you full control of your digital assets
            without relying on a bank or third party. It enables you to send,
            receive, and manage your cryptocurrency, empowering you to take part
            in the decentralized world of digital finance.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default WhatIsACryptoWallet;
