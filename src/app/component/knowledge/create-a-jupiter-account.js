import Section from "../../component/layouts/Section.js";

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
      <div style={styles.card}>
        <img
          style={styles.cardImgTop}
          src="/assets/img/jupiter-account.png"
          alt="Tree Image"
        />
        <div style={styles.cardBody}>
          <div style={styles.divider} />
          <p style={styles.paragraph}>
            Jupiter is a powerful platform on the Solana blockchain that acts as
            an aggregator, helping users find the best rates for swapping or
            bridging tokens across various decentralized exchanges (DEXs). With
            Jupiter, you get access to a network of exchanges on Solana,
            ensuring you always get the most value when trading tokens.
          </p>
          <p style={styles.title}>Why Use Jupiter?</p>
          <p style={styles.paragraph}>
            Jupiter is the preferred choice for TreeTherium users when it comes
            to buying and managing $SEEDZ and $TREEZ tokens. With Jupiter, you
            can quickly swap between tokens or bridge assets to support your
            TreeTherium activities, all while getting the best available rates.
            It’s reliable, efficient, and designed to make navigating the Solana
            blockchain simple.
          </p>
          <p style={styles.title}>Getting Started With Jupiter</p>
          <p style={styles.paragraph}>
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
