import Section from "../../component/layouts/Section.js";
import Image from "next/image";

const WhatIsTreeTherium = () => {
  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"What Is TreeTherium"}
    >
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">&quot;governed by you&quot;</h3>
        </div>
      </div>
      <div style={styles.card}>
        <Image
          style={styles.cardImgTop}
          src="/assets/img/what-is-treetherium.png"
          alt="Tree Image"
          width={600}
          height={253}
          layout="responsive" 
          priority={true} 
        />
        <div style={styles.cardBody}>
          <div style={styles.divider} />
          <p style={styles.paragraph}>
            TreeTherium is a unique platform that combines environmental impact
            with blockchain technology, making it possible to fund and manage
            tree-planting projects worldwide. By using blockchain and crypto,
            TreeTherium ensures transparency, security, and growth for
            environmental projects, helping users take part in reforestation
            efforts that positively impact our planet.
          </p>
          <p style={styles.title}>What are $TREEZ?</p>
          <p style={styles.paragraph}>
            $TREEZ is TreeTherium’s main utility token. It’s used to support
            tree-planting projects within the platform, allowing participants to
            fund and track these initiatives. Every $TREEZ token represents a
            step towards a greener future, empowering users to contribute
            directly to environmental conservation and watch their impact grow.
          </p>
          <p style={styles.title}>What is TreeTherium DAO?</p>
          <p style={styles.paragraph}>
            TreeTherium DAO is a decentralized community where token holders
            have a voice in important decisions. By participating in the DAO,
            community partners help shape the future of TreeTherium, from
            project selection to resource allocation, ensuring that the platform
            remains true to its mission. Each DAO partner can create proposals
            and vote on proposals. This DAO empowers a global community to drive
            real environmental impact together.
          </p>
          <p style={styles.title}>What are $SEEDZ?</p>
          <p style={styles.paragraph}>
            $SEEDZ is TreeTherium’s governance token, giving holders the power
            to vote on decisions and proposals within the DAO. Beyond voting,
            $SEEDZ also rewards community members who actively participate in
            TreeTherium projects. By holding $SEEDZ, users become more than just
            supporters—they become stakeholders in the platform’s environmental
            mission.
          </p>
          <p style={styles.title}>Ready to Make an Impact?</p>
          <p style={styles.paragraphLast}>
            Join TreeTherium today and be part of a global movement to restore
            our planet, one tree at a time. Whether you’re planting, supporting
            projects with $TREEZ, or shaping the future through our DAO with
            $SEEDZ, your actions have a real and lasting effect. Together, we
            can create greener landscapes and a brighter future. Let’s make
            change happen—start your journey with TreeTherium!
          </p>
        </div>
      </div>
    </Section>
  );
};

export default WhatIsTreeTherium;

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
