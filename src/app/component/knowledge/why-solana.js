import Section from '../../component/layouts/Section.js';
import Link from 'next/link';

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
            <div style={styles.card}>
                <img
                    style={styles.cardImgTop}
                    src="/assets/img/why-solana.png"
                    alt="Tree Image"
                />
                <div style={styles.cardBody}>
                    <div style={styles.divider} />
                    <p style={styles.paragraph}>Solana stands out in the cryptocurrency world as a powerful, efficient, and environmentally conscious blockchain. Known for its high speed and low-cost transactions, Solana offers a scalable solution for decentralized applications, NFTs, and crypto projects. By addressing some of the biggest challenges in blockchain—speed, cost, and environmental impact—Solana has become a leading choice for innovative projects and eco-conscious investors alike.</p>
                    <p style={styles.title}>What Sets Solana Apart?</p>
                    <p style={styles.paragraph}>Unlike many other blockchains, Solana uses a unique consensus mechanism called Proof of History (PoH) combined with Proof of Stake (PoS). This approach enables the network to process thousands of transactions per second without compromising security or decentralization. By minimizing network congestion and reducing transaction fees, Solana allows users and developers to build and interact with applications smoothly and affordably, setting it apart from older, slower blockchain networks.</p>
                    <p style={styles.title}>Solana’s Commitment to Net Zero</p>
                    <p style={styles.paragraph}>Solana is also deeply committed to sustainability. Recognizing the environmental impact of blockchain technology, Solana aims to achieve Net Zero carbon emissions, making it one of the most environmentally friendly blockchain platforms. By using energy-efficient consensus methods and partnering with environmental organizations, Solana actively offsets its carbon footprint, ensuring that its technological advancements align with its sustainability goals. This commitment to eco-conscious practices makes Solana an ideal choice for projects prioritizing both innovation and environmental responsibility.</p>
                    <p style={styles.title}>Building the Future with Solana</p>
                    <p style={styles.paragraph}>Solana’s combination of speed, cost efficiency, and sustainability is driving the future of decentralized technology. For developers and users looking to support eco-friendly solutions, Solana offers a powerful platform that balances high performance with a commitment to our planet.</p>
                    <p style={styles.paragraphLast}>Click here to find out more about <Link href="https://climate.solana.com/ "><span className="underline-text"><strong>Solana & The Environment.</strong></span></Link></p>
                </div>
            </div>
        </Section>
    );
}

export default WhySolana;

const styles = {
    card: {
        backgroundColor: '#fff', /* White background for the card */
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', /* Soft shadow */
        borderRadius: '10px 10px 0 0',
        textAlign: 'left', /* Left-align content */
        padding: '0', /* Inner padding */
        maxWidth: '100%', /* Max width for the card */
        margin: '21px 20px 100px',
    },
    cardImgTop: {
        height: '253px',
        borderRadius: '10px 10px 0 0',
        objectFit: 'cover',
        width: '100%',
    },
    cardBody: {
        padding: '0 20px',
    },
    title: {
        fontSize: '1.125em',
        fontWeight: 700,
        color: '#4F3738',
        padding: '0 0 8px',
        marginBottom: '0px',
    },
    divider: {
        width: '100%',
        height: '4px',
        margin: '15px 0 11px',
        borderRadius: '50px',
        backgroundColor: '#e7e1ee',
    },
    paragraph: {
        fontSize: '1.125em',
        fontWeight: 400,
        color: '#4F3738',
        padding: '0 0 15px',
        marginBottom: '0px',
    },
    paragraphLast: {
        fontSize: '1.125em',
        fontWeight: 400,
        color: '#4F3738',
        padding: '0 0 25px',
        marginBottom: '0px',
    },
    // Adding a responsive layout to make sure the text and dividers adjust well to screen size
    '@media (min-width: 600px)': {
        card: {
            maxWidth: '80%',   // Limit card width on medium screens
        },
    },
    '@media (min-width: 1024px)': {
        card: {
            maxWidth: '600px',  // Limit card width on larger screens
        },
        title: {
            fontSize: '1.5rem',
        },
        page: {
            fontSize: '1.125rem',
        },
        paragraph: {
            fontSize: '1.125rem',
        },
    },
};