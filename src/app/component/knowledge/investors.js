import Section from "../../component/layouts/Section.js";
import Image from "next/image";
import styles from "./textstyle.module.css";

const Investors = () => {
  return (
    <Section allNotification={false} searchPopup={true} title={"Investors"}>
      <div className="pd-top-36">
        <div className="container">
          <h3 className="form-title">
            &quot;plant your money towards a greener planet&quot;
          </h3>
        </div>
      </div>
      <div className={styles.card}>
        <Image
          className={styles.cardImgTop}
          src="/assets/img/investors.png"
          alt="Tree Image"
          width={600} 
          height={253}
          layout="responsive" 
          priority={true} 
        />
        <div className={styles.cardBody}>
          <div className={styles.divider} />
          <p className={styles.paragraph}>
            TreeTherium offers a unique opportunity for investors to support
            reforestation while engaging with a pioneering green crypto
            platform. By investing in TreeTherium tokens, you’re not just buying
            into a digital asset—you’re fueling sustainable environmental
            projects and promoting a healthier planet. Every token contributes
            to tree-planting initiatives that make a lasting impact.
          </p>
          <p className={styles.title}>Invest In TreeTherium Tokens</p>
          <p className={styles.paragraph}>
            To purchase TreeTherium tokens, we recommend using Raydium as our
            DEX (Decentralized Exchange) of choice. Raydium provides a fast,
            secure platform for trading tokens, making it easy to join our
            growing community. New users who register for a Raydium account
            receive a referral bonus, adding extra value to your initial
            investment. Start trading with confidence and enjoy this exclusive
            perk as a Raydium member.
          </p>
          <p className={styles.title}>Swap or Bridge with Jupiter</p>
          <p className={styles.paragraph}>
            For the best rates, consider using Jupiter, our preferred
            aggregator, to compare token prices across multiple exchanges.
            Jupiter simplifies the process of swapping or bridging tokens,
            ensuring you get the best possible rate for your investment. New
            registrants also receive a welcome bonus, making it an ideal
            platform to start or expand your investment in TreeTherium.
          </p>
          <p className={styles.title}>Stake TreeTherium For A Greener Planet</p>
          <p className={styles.paragraph}>
            Investors also have the option to stake their tokens toward specific
            tree-planting projects, allowing you to directly support the
            initiatives that resonate most with you. By staking, you not only
            earn rewards but also contribute to targeted reforestation efforts,
            making your investment even more impactful.
          </p>
          <p className={styles.title}>A Sustainable Investment with Real Impact</p>
          <p className={styles.paragraph}>
            Investing in TreeTherium means you’re part of a global mission for
            environmental change. Beyond financial growth, our tokens offer a
            way to connect with tangible, impactful projects. With TreeTherium,
            you’re investing in a greener, more sustainable future—one tree at a
            time.
          </p>
          <p className={styles.title}>Join the TreeTherium Movement</p>
          <p className={styles.paragraphLast}>
            Ready to invest in a better future? Buy TreeTherium tokens today and
            be part of a growing network of investors making real change happen.
            Join us and make your investment count!
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Investors;
