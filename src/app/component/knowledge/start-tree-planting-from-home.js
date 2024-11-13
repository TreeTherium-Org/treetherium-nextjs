import Section from "../../component/layouts/Section.js";
import Image from "next/image";

const StartTreePlanting = () => {
  return (
    <Section
      allNotification={false}
      searchPopup={true}
      title={"Start Tree Planting From Home"}
    >
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">
            &quot;every one can grow a forest&quot;
          </h3>
        </div>
      </div>
      <div style={styles.card}>
        <Image
          style={styles.cardImgTop}
          src="/assets/img/start-tree-planting-from-home.png"
          alt="Tree Image"
          width={600} 
          height={253}
          layout="responsive" 
          priority={true} 
        />
        <div style={styles.cardBody}>
          <div style={styles.divider} />
          <p style={styles.paragraph}>
            You don’t need a big garden or farm to start your own tree-planting
            journey. With a few simple steps, you can germinate seeds from
            everyday fruits and grow small trees right from your windowsill. Not
            every seed will thrive in every climate, so keep in mind that
            tropical fruits might not grow well in colder areas, and vice versa.
            However, plenty of seeds can still be started indoors, adding a
            little greenery to your home and helping the planet!
          </p>
          <p style={styles.title}>How To Germinate Seeds</p>
          <p style={styles.paragraph}>
            Starting seeds is simple and only requires a few basic items. Take
            seeds from fruits like apples, oranges, or even lemons, and rinse
            them clean. Wrap them in a damp paper towel, place them in a clear
            plastic bag, and leave the bag somewhere warm. After a week or two,
            you should start to see small roots or sprouts emerging. This
            process is called germination, and it’s the first step to growing
            your own mini trees.
          </p>
          <p style={styles.title}>What To Do When Seeds Germinate</p>
          <p style={styles.paragraph}>
            Once your seeds have sprouted, they’re ready to be planted in small
            pots filled with soil. Make a small hole in the soil, gently place
            the sprouted seed inside, and cover it lightly. Place the pot on a
            sunny windowsill, as most young plants need sunlight to grow strong.
            Water them lightly, being careful not to soak the soil—too much
            water can harm young sprouts.
          </p>
          <p style={styles.title}>Caring For Your Mini Trees</p>
          <p style={styles.paragraph}>
            Mini trees need care to grow strong and healthy. Keep the soil moist
            but avoid overwatering, and make sure they have enough sunlight. If
            the leaves start to look pale or yellow, consider moving the pot to
            a sunnier spot or adding a small amount of plant food. With regular
            attention, your mini trees will thrive, and you can watch as they
            grow from tiny sprouts into sturdy young trees.
          </p>
          <p style={styles.title}>Plant A Tree</p>
          <p style={styles.paragraph}>
            Get out there, plant your tree, tokenize it, and see your forest
            grow. The next step would be to motivate others to do the same.
          </p>
        </div>
      </div>
    </Section>
  );
};

export default StartTreePlanting;

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
