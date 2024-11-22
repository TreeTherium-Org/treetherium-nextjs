import Section from "../../component/layouts/Section.js";
import Image from "next/image";
import styles from "./textstyle.module.css";

const Raydium = () => {
  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"Create A Raydium DEX Account"}
    >
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">&quot;DEX is the way forward&quot;</h3>
        </div>
      </div>
      <div className={styles.card}>
        <Image
          className={styles.cardImgTop}
          src="/assets/img/DEX-raydium.png"
          alt="Tree Image"
          width={600}
          height={253}
          layout="responsive"
        />
        <div className={styles.cardBody}>
          <div className={styles.divider} />
          <p className={styles.paragraph}>
            Raydium is a decentralized exchange (DEX) built on the Solana
            blockchain, offering fast, low-cost trading for a variety of
            Solana-based tokens. As a DEX, Raydium allows users to trade crypto
            directly with one another, without the need for a central authority
            or intermediary. This makes trading more secure, transparent, and
            gives you full control over your assets.
          </p>
          <p className={styles.title}>What Does A DEX Do?</p>
          <p className={styles.paragraph}>
            A DEX, or decentralized exchange, connects buyers and sellers
            directly on the blockchain. Unlike traditional exchanges, DEXs don’t
            hold your assets; instead, trades happen directly between users.
            This decentralized approach enhances security and reduces
            transaction fees, making it a preferred choice for many crypto
            users. With Raydium, all transactions are powered by Solana’s
            high-speed network, ensuring quick trades and minimal costs.
          </p>
          <p className={styles.title}>Why Raydium For TreeTherium?</p>
          <p className={styles.paragraph}>
            Raydium is our preferred DEX for trading $SEEDZ and $TREEZ tokens.
            Its integration with Solana ensures you benefit from fast
            transactions and competitive fees, essential for a smooth
            TreeTherium experience. As a TreeTherium user, Raydium provides you
            with a reliable, user-friendly platform to manage your tokens and
            support environmental projects effortlessly.
          </p>
          <p className={styles.title}>Getting Started On Raydium</p>
          <p className={styles.paragraph}>
            To start, connect your Phantom Wallet to Raydium. This will give you
            instant access to trading, staking, and other features. Once
            connected, you’re ready to trade tokens, explore liquidity pools,
            and actively participate in the TreeTherium community.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Raydium;