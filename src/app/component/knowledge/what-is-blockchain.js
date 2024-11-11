import Section from "../../component/layouts/Section.js";

const WhatIsBlockchain = () => {
  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"What Is Blockchain"}
    >
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">
            &quot;action driven transparent security protocol&quot;
          </h3>
        </div>
      </div>
      <div style={styles.card}>
        <img
          style={styles.cardImgTop}
          src="/assets/img/what-is-blockchain.png"
          alt="Tree Image"
        />
        <div style={styles.cardBody}>
          <div style={styles.divider} />
          <p style={styles.paragraph}>
            Blockchain is a revolutionary technology that securely records and
            stores data across a decentralized network of computers. Originally
            designed to support cryptocurrencies like Bitcoin, blockchain has
            since expanded to power a wide range of applications, from finance
            to supply chain management. This technology’s unique structure makes
            it transparent, secure, and resistant to tampering.
          </p>
          <p style={styles.title}>How Does Blockchain Work?</p>
          <p style={styles.paragraph}>
            At its core, a blockchain is a series of linked &quot;blocks,&quot;
            each containing a list of transactions. When a transaction occurs,
            it’s grouped with others in a block and added to the chain in
            chronological order. This structure creates a permanent,
            time-stamped record that’s nearly impossible to alter, as every
            block is cryptographically linked to the one before it. This setup
            makes blockchain a reliable and trustworthy way to record data.
          </p>
          <p style={styles.title}>Decentralization: No Central Authority</p>
          <p style={styles.paragraph}>
            Unlike traditional databases managed by a single organization,
            blockchain is decentralized. This means that no single entity
            controls the network. Instead, multiple nodes (computers) work
            together to validate and record transactions. Decentralization makes
            blockchain more secure, as data is spread across the network and
            protected from single points of failure or manipulation.
          </p>
          <p style={styles.title}>Transparency and Security</p>
          <p style={styles.paragraph}>
            Blockchain’s transparent nature allows all participants to view
            transactions on the network, creating an open and accountable
            system. Additionally, each transaction is verified by multiple
            nodes, adding a layer of security. The data within a blockchain is
            encrypted, meaning that while it’s visible, it remains private and
            tamper-proof.
          </p>
          <p style={styles.title}>Real-World Applications of Blockchain</p>
          <p style={styles.paragraph}>
            While blockchain began as the foundation for cryptocurrencies, its
            uses now extend to various fields. In finance, blockchain enables
            faster, cheaper transactions. In supply chains, it provides
            traceable records for products from origin to consumer. Blockchain
            is also used in healthcare for securely managing patient records,
            and in the energy sector for tracking renewable energy credits.
          </p>
          <p style={styles.title}>TreeTherium & Blockchain</p>
          <p style={styles.paragraph}>
            TreeTherium harnesses the power of blockchain to bring transparency,
            security, and accountability to environmental projects. By recording
            every tree planted and every transaction on the blockchain,
            TreeTherium ensures that each contribution to reforestation is
            tracked and verified. This use of blockchain technology allows
            TreeTherium to connect digital assets with real-world impact,
            providing users with confidence that their investments in
            tree-planting are making a lasting, measurable difference for the
            planet.
          </p>
          <p style={styles.title}>Why Blockchain Matters for the Future</p>
          <p style={styles.paragraphLast}>
            Blockchain’s potential goes beyond currency and transactions. Its
            secure, transparent, and decentralized design has the potential to
            transform industries, promote accountability, and empower
            individuals. As more businesses and governments explore blockchain,
            this technology is poised to play a vital role in building a more
            efficient and transparent world.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default WhatIsBlockchain;

const styles = {
  card: {
    backgroundColor: "#fff" /* White background for the card */,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" /* Soft shadow */,
    borderRadius: "10px 10px 0 0",
    textAlign: "left" /* Left-align content */,
    padding: "0" /* Inner padding */,
    maxWidth: "100%" /* Max width for the card */,
    margin: "21px 20px 100px",
  },
  cardImgTop: {
    height: "253px",
    borderRadius: "10px 10px 0 0",
    objectFit: "cover",
    width: "100%",
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
    textTransform: 'capitalize'
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
  },
  paragraphLast: {
    fontSize: "1.125em",
    fontWeight: 400,
    color: "#4F3738",
    padding: "0 0 25px",
    marginBottom: "0px",
  },
  // Adding a responsive layout to make sure the text and dividers adjust well to screen size
  "@media (min-width: 600px)": {
    card: {
      maxWidth: "80%", // Limit card width on medium screens
    },
  },
  "@media (min-width: 1024px)": {
    card: {
      maxWidth: "600px", // Limit card width on larger screens
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
