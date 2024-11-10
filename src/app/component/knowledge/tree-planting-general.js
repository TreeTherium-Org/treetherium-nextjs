import Section from '../../component/layouts/Section.js';

const TreePlantingGeneral = () => {
    return (
        <Section allNotification={false} searchPopup={true} title={'Tree Planting General'}>
            <div className="pd-top-36">
                <div className="container">
                    <h3 className="form-title">
                        &quot;plant your money towards a greener planet&quot;
                    </h3>
                </div>
            </div>
            <div style={styles.card}>
                <img
                    style={styles.cardImgTop}
                    src="/assets/img/investors.png"
                    alt="Tree Image"
                />
                <div style={styles.cardBody}>
                    <div style={styles.divider} />
                    <p style={styles.paragraph}>TreeTherium offers a unique opportunity for investors to support reforestation while engaging with a pioneering green crypto platform. By investing in TreeTherium tokens, you’re not just buying into a digital asset—you’re fueling sustainable environmental projects and promoting a healthier planet. Every token contributes to tree-planting initiatives that make a lasting impact.</p>
                    <p style={styles.title}>Invest In TreeTherium Tokens</p>
                    <p style={styles.paragraph}>To purchase TreeTherium tokens, we recommend using Raydium as our DEX (Decentralized Exchange) of choice. Raydium provides a fast, secure platform for trading tokens, making it easy to join our growing community. New users who register for a Raydium account receive a referral bonus, adding extra value to your initial investment. Start trading with confidence and enjoy this exclusive perk as a Raydium member.</p>
                    <p style={styles.title}>Swap or Bridge with Jupiter</p>
                    <p style={styles.paragraph}>For the best rates, consider using Jupiter, our preferred aggregator, to compare token prices across multiple exchanges. Jupiter simplifies the process of swapping or bridging tokens, ensuring you get the best possible rate for your investment. New registrants also receive a welcome bonus, making it an ideal platform to start or expand your investment in TreeTherium.</p>
                    <p style={styles.title}>Stake TreeTherium For A Greener Planet</p>
                    <p style={styles.paragraph}>Investors also have the option to stake their tokens toward specific tree-planting projects, allowing you to directly support the initiatives that resonate most with you. By staking, you not only earn rewards but also contribute to targeted reforestation efforts, making your investment even more impactful.</p>
                    <p style={styles.title}>A Sustainable Investment with Real Impact</p>
                    <p style={styles.paragraph}>Investing in TreeTherium means you’re part of a global mission for environmental change. Beyond financial growth, our tokens offer a way to connect with tangible, impactful projects. With TreeTherium, you’re investing in a greener, more sustainable future—one tree at a time.</p>
                    <p style={styles.title}>Join the TreeTherium Movement</p>
                    <p style={styles.paragraphLast}>Ready to invest in a better future? Buy TreeTherium tokens today and be part of a growing network of investors making real change happen. Join us and make your investment count!</p>
                </div>
            </div>
        </Section>
    );
}

export default TreePlantingGeneral;

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