import Section from '../../component/layouts/Section.js';
import Link from 'next/link';
import Image from 'next/image';
import styles from "./textstyle.module.css";

const WhySolana = () => {
    return (
        <Section allNotification={false} searchPopup={true} title={'Why Solana'}>
            <div className="pd-top-36">
                <div className="container">
                    <h3 className="form-title">
                        &quot;solana is a net zero company&quot;
                    </h3>
                </div>
            </div>
            <div className={styles.card}>
                <Image
                    className={styles.cardImgTop}
                    src="/assets/img/why-solana.png"
                    alt="Tree Image"
                    width={600} 
                    height={253}
                    layout="responsive"
                    priority={true} 
                />
                <div className={styles.cardBody}>
                    <div className={styles.divider} />
                    <p className={styles.paragraph}>Solana stands out in the cryptocurrency world as a powerful, efficient, and environmentally conscious blockchain. Known for its high speed and low-cost transactions, Solana offers a scalable solution for decentralized applications, NFTs, and crypto projects. By addressing some of the biggest challenges in blockchain—speed, cost, and environmental impact—Solana has become a leading choice for innovative projects and eco-conscious investors alike.</p>
                    <p className={styles.title}>What Sets Solana Apart?</p>
                    <p className={styles.paragraph}>Unlike many other blockchains, Solana uses a unique consensus mechanism called Proof of History (PoH) combined with Proof of Stake (PoS). This approach enables the network to process thousands of transactions per second without compromising security or decentralization. By minimizing network congestion and reducing transaction fees, Solana allows users and developers to build and interact with applications smoothly and affordably, setting it apart from older, slower blockchain networks.</p>
                    <p className={styles.title}>Solana’s Commitment to Net Zero</p>
                    <p className={styles.paragraph}>Solana is also deeply committed to sustainability. Recognizing the environmental impact of blockchain technology, Solana aims to achieve Net Zero carbon emissions, making it one of the most environmentally friendly blockchain platforms. By using energy-efficient consensus methods and partnering with environmental organizations, Solana actively offsets its carbon footprint, ensuring that its technological advancements align with its sustainability goals. This commitment to eco-conscious practices makes Solana an ideal choice for projects prioritizing both innovation and environmental responsibility.</p>
                    <p className={styles.title}>Building the Future with Solana</p>
                    <p className={styles.paragraph}>Solana’s combination of speed, cost efficiency, and sustainability is driving the future of decentralized technology. For developers and users looking to support eco-friendly solutions, Solana offers a powerful platform that balances high performance with a commitment to our planet.</p>
                    <p className={styles.paragraphLast}>
                        Click here to find out more about <Link href="https://climate.solana.com/" legacyBehavior>
                            <a target="_blank" rel="noopener noreferrer" className="underline-text"><strong>Solana & The Environment.</strong></a>
                        </Link>
                    </p>
                </div>
            </div>
        </Section>
    );
}

export default WhySolana;

