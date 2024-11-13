import Section from "../../component/layouts/Section.js";
import Image from "next/image";

const WhatIsCrypto = () => {
  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"What Is Crypto"}
    >
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">
            &quot;steps towards a decentralized world&quot;
          </h3>
        </div>
      </div>
      <div style={styles.card}>
        <Image
          style={styles.cardImgTop}
          src="/assets/img/what-is-crypto.png"
          alt="Tree Image"
          width={600} 
          height={253}
          layout="responsive" 
          priority={true} 
        />
        <div style={styles.cardBody}>
          <div style={styles.divider} />
          <p style={styles.paragraph}>
            Cryptocurrency is a form of digital money that operates
            independently of traditional banks and governments. Unlike regular
            currencies like dollars or euros, crypto relies on a technology
            called blockchain, which keeps it secure and decentralized. Created
            as an alternative to conventional finance, crypto is designed for
            digital transactions and global accessibility, allowing people
            around the world to send, receive, and store value securely online.
          </p>
          <p style={styles.title}>How Does Cryptocurrency Work?</p>
          <p style={styles.paragraph}>
            Cryptocurrencies operate on a technology known as blockchain—a
            digital ledger shared across a network of computers. Each
            transaction is recorded on this ledger, creating a chain of secure,
            transparent records. This system is decentralized, meaning no
            central authority or bank controls it. Instead, a network of
            computers validates and records every transaction, ensuring security
            and transparency for users.
          </p>
          <p style={styles.title}>Types of Cryptocurrencies</p>
          <p style={styles.paragraph}>
            There are thousands of cryptocurrencies, but they generally fall
            into a few main categories. Bitcoin was the first and remains the
            most popular, often seen as &quot;digital gold.&quot; Altcoins
            include a wide variety of other cryptocurrencies like Ethereum,
            which allows for smart contracts, and stablecoins like USDT, which
            are tied to the value of traditional currencies to reduce
            volatility. Each type of cryptocurrency serves different purposes,
            from investment to payments and more.
          </p>
          <p style={styles.title}>Why is Crypto Valuable?</p>
          <p style={styles.paragraph}>
            The value of cryptocurrency often comes from its limited supply and
            the trust users have in its technology. For example, Bitcoin has a
            capped supply of 21 million coins, creating scarcity that can
            increase value as demand grows. Additionally, cryptocurrencies offer
            unique benefits like fast, low-cost global transfers and financial
            freedom, as they aren&apos;t restricted by borders or traditional
            banking regulations.
          </p>
          <p style={styles.title}>Crypto Wallets: Where is Crypto Stored?</p>
          <p style={styles.paragraph}>
            Crypto is stored in digital wallets, which can be online (hot
            wallets) or offline (cold wallets). A wallet doesn’t actually hold
            your cryptocurrency; instead, it stores the private keys that let
            you access and manage your crypto. These private keys are essential
            to keeping your funds secure—remember, your keys, your crypto. If
            you lose them, you lose access to your funds.
          </p>
          <p style={styles.title}>How Do You Use Cryptocurrency?</p>
          <p style={styles.paragraph}>
            Cryptocurrency can be used in various ways. You can buy, sell, or
            trade it on exchanges, or hold it as an investment. Some businesses
            accept crypto as payment for goods and services, allowing you to
            spend it like traditional currency. Crypto can also be used for
            transferring funds globally, often with lower fees and faster
            transaction times than regular bank transfers.
          </p>
          <p style={styles.title}>The Role of Crypto in the Future</p>
          <p style={styles.paragraphLast}>
            As digital transactions become more common, cryptocurrency could
            play a bigger role in the financial world. It has the potential to
            increase financial inclusion, streamline international transactions,
            and even reshape traditional banking. Crypto’s underlying
            technology, blockchain, is also being used for everything from smart
            contracts to supply chain management, hinting at a future where
            crypto and blockchain applications are integrated into everyday
            life.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default WhatIsCrypto;

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
